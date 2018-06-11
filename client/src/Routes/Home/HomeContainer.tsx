import React from "react";
import { graphql, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { ME } from "../../sharedQueries";
import { geocode, reverseGeocode } from "../../utils";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  fromAddress: string;
  toLat: number;
  toLng: number;
  toAddress: string;
  mapChoosing: boolean;
}

class HomeContainer extends React.Component<any, IState> {
  mapRef: any;
  map: google.maps.Map;
  userMarker: google.maps.Marker;
  toMarker: google.maps.Marker;

  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false,
      lat: 0,
      lng: 0,
      toLat: 0,
      toLng: 0,
      toAddress: "",
      fromAddress: "",
      mapChoosing: false
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  render() {
    const { isMenuOpen, toAddress, mapChoosing } = this.state;
    return (
      <Query query={ME}>
        {({ loading, data }) => (
          <HomePresenter
            isMenuOpen={isMenuOpen}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            redirectToVerify={this.redirectToVerify}
            data={data}
            loading={loading}
            mapRef={this.mapRef}
            handleInputChange={this.handleInputChange}
            toAddress={toAddress}
            submitAddress={this.submitAddress}
            mapChoosing={mapChoosing}
            toggleMapChoosing={this.toggleMapChoosing}
            chooseMapAddres={this.chooseMapAddres}
          />
        )}
      </Query>
    );
  }

  private redirectToVerify = () => {
    const { history } = this.props;
    history.push("/add-phone");
  };

  private openMenu = () => {
    this.setState({
      isMenuOpen: true
    });
  };

  private closeMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  private handleGeoSuccess: PositionCallback = (position: Position): void => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState(
      {
        lat: latitude,
        lng: longitude
      },
      this.loadMap
    );
  };

  private handleGeoError: PositionErrorCallback = (
    error: PositionError
  ): void => {
    toast.error(`Can't get address, ${error.message}`);
  };

  private loadMap = (): void => {
    const { google } = this.props;
    const { lat, lng } = this.state;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat, lng },
      zoom: 16,
      mapTypeId: "roadmap",
      disableDefaultUI: true,
      minZoom: 5
    };
    this.map = new maps.Map(node, mapConfig);
    this.map.addListener("dragend", this.handleCenterChange);
    const userMarker: google.maps.Marker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      icon: {
        url: require("../../images/marker.png"),
        scaledSize: new google.maps.Size(20, 20)
      }
    });
    this.userMarker = userMarker;
    userMarker.setMap(this.map);
    const locationOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.watchPosition(
      this.updatePosition,
      this.handleGeoError,
      locationOptions
    );
  };

  private updatePosition: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    const latLng = new google.maps.LatLng(latitude, longitude);
    this.userMarker.setPosition(latLng);
  };

  private handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  private submitAddress = async () => {
    const { toAddress } = this.state;
    const { lat, lng, error } = await geocode(toAddress);
    if (!error) {
      this.setState(
        {
          toLat: lat,
          toLng: lng
        },
        this.createToMarket
      );
    } else {
      toast.error("Cant get location");
    }
  };

  private toggleMapChoosing = () => {
    this.setState(prevState => {
      return {
        mapChoosing: !prevState.mapChoosing,
        toLat: 0,
        toLng: 0
      };
    });
  };

  private handleCenterChange = () => {
    const { mapChoosing } = this.state;
    if (mapChoosing) {
      const center = this.map.getCenter();
      const lat = center.lat();
      const lng = center.lng();
      this.setState(
        {
          toLat: lat,
          toLng: lng
        },
        this.hidrateAddress
      );
    }
  };

  private hidrateAddress = async () => {
    const { toLat, toLng } = this.state;
    const { address, error } = await reverseGeocode(toLat, toLng);
    if (!error) {
      this.setState({
        toAddress: address
      });
    } else {
      toast.error("Cant get location");
    }
  };

  private chooseMapAddres = () => {
    const { toLat, toLng } = this.state;
    if (toLat !== 0 && toLng !== 0) {
      this.setState(
        {
          mapChoosing: false
        },
        this.createToMarket
      );
    }
  };

  private createToMarket = () => {
    const { toLng, toLat, lat, lng } = this.state;
    if (this.toMarker) {
      this.toMarker.setMap(null);
    }
    const toMarker: google.maps.Marker = new google.maps.Marker({
      position: {
        lat: toLat,
        lng: toLng
      }
    });
    this.toMarker = toMarker;
    this.toMarker.setMap(this.map);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: toLat, lng: toLng });
    bounds.extend({ lat, lng });
    this.map.fitBounds(bounds);
    this.createPath();
  };

  private createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();
    const toPlace = new google.maps.LatLng(toLat, toLng);
    const fromPlace = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: fromPlace,
      destination: toPlace,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(directionsOptions, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });
    directionsRenderer.setMap(this.map);
  };
}

export default graphql(ME)(HomeContainer);
