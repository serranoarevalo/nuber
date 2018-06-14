import React from "react";
import { compose, graphql, MutationFn } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { ME } from "../../sharedQueries";
import { geocode, reverseGeocode } from "../../utils";
import HomePresenter from "./HomePresenter";
import { GET_DRIVERS, UPDATE_LOCATION } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  fromAddress: string;
  toLat: number;
  toLng: number;
  toAddress: string;
  mapChoosing: boolean;
  findingDirections: boolean;
}

interface IProps {
  reportLocation: MutationFn;
  history: any;
  google: any;
  loading: boolean;
  MeQuery: any;
  GetDriversQuery: any;
}

class HomeContainer extends React.Component<IProps, IState> {
  mapRef: any;
  map: google.maps.Map;
  userMarker: google.maps.Marker;
  toMarker: google.maps.Marker;
  directionRenderer: google.maps.DirectionsRenderer;
  driverMarkers: google.maps.Marker[];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
      lat: 0,
      lng: 0,
      toLat: 0,
      toLng: 0,
      toAddress: "",
      fromAddress: "",
      mapChoosing: false,
      findingDirections: false
    };
    this.driverMarkers = [];
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      GetDriversQuery: { getDrivers: { drivers = null } = {} } = {}
    } = nextProps;
    if (drivers) {
      if (this.map) {
        this.drawDrivers(drivers);
      }
    }
  }

  render() {
    const {
      isMenuOpen,
      toAddress,
      mapChoosing,
      findingDirections
    } = this.state;
    const {
      MeQuery: { loading, me }
    } = this.props;

    return (
      <HomePresenter
        isMenuOpen={isMenuOpen}
        openMenu={this.openMenu}
        closeMenu={this.closeMenu}
        redirectToVerify={this.redirectToVerify}
        me={me}
        loading={loading}
        mapRef={this.mapRef}
        handleInputChange={this.handleInputChange}
        toAddress={toAddress}
        submitAddress={this.submitAddress}
        mapChoosing={mapChoosing}
        toggleMapChoosing={this.toggleMapChoosing}
        chooseMapAddres={this.chooseMapAddres}
        requestRide={this.requestRide}
        findingDirections={findingDirections}
      />
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
    console.log(error);
  };

  private loadMap = (): void => {
    const {
      google,
      GetDriversQuery,
      MeQuery: {
        me: {
          user: { isDriving }
        }
      }
    } = this.props;
    const { lat, lng } = this.state;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat, lng },
      zoom: 16,
      mapTypeId: "roadmap",
      disableDefaultUI: true
    };
    this.map = new maps.Map(node, mapConfig);
    this.map.addListener("dragend", this.handleCenterChange);
    this.userMarker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      icon: {
        url: require("../../images/marker.png"),
        scaledSize: new google.maps.Size(20, 20)
      }
    });
    this.userMarker.setMap(this.map);
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
    if (!isDriving) {
      const {
        getDrivers: { drivers }
      } = GetDriversQuery;
      this.drawDrivers(drivers);
    }
  };

  private updatePosition: PositionCallback = (position: Position) => {
    const { reportLocation } = this.props;
    const {
      coords: { latitude, longitude }
    } = position;
    const latLng = new google.maps.LatLng(latitude, longitude);
    this.userMarker.setPosition(latLng);
    reportLocation({
      variables: {
        lat: latitude,
        lng: longitude
      }
    });
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
    const { toAddress, mapChoosing } = this.state;
    const { lat, lng, error } = await geocode(toAddress);
    if (!mapChoosing) {
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

  private chooseMapAddres = (): void => {
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

  private createToMarket = (): void => {
    const { toLng, toLat, lat, lng } = this.state;
    if (this.toMarker) {
      this.toMarker.setMap(null);
    }
    this.toMarker = new google.maps.Marker({
      position: {
        lat: toLat,
        lng: toLng
      }
    });
    this.toMarker.setMap(this.map);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: toLat, lng: toLng });
    bounds.extend({ lat, lng });
    this.map.fitBounds(bounds);
    this.createPath();
  };

  private createPath = (): void => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directionRenderer) {
      this.directionRenderer.setMap(null);
    }
    const rendererOptions: google.maps.DirectionsRendererOptions = {
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#000"
      }
    };
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    this.directionRenderer = new google.maps.DirectionsRenderer(
      rendererOptions
    );
    const toPlace = new google.maps.LatLng(toLat, toLng);
    const fromPlace = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: fromPlace,
      destination: toPlace,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.setState({
      findingDirections: true
    });
    directionsService.route(directionsOptions, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionRenderer.setDirections(result);
        this.setState({
          findingDirections: false
        });
      } else {
        toast.error(
          "Could not find a way to get there, you might have to swim"
        );
      }
    });
    this.directionRenderer.setMap(this.map);
  };

  private requestRide = (): void => {
    const { toLat, toLng } = this.state;
    if (toLat === 0 || toLng === 0) {
      toast.error("Cant order ride. Choose an address to go to");
    }
  };

  private drawDrivers = (drivers): void => {
    const DRIVER_ID = "driverId";
    if (this.map) {
      for (const driver of drivers) {
        const { lastLat, lastLng, id: driverId } = driver;
        const driverPosition: google.maps.LatLng = new google.maps.LatLng(
          lastLat,
          lastLng
        );
        const existingMarker:
          | google.maps.Marker
          | undefined = this.driverMarkers.find(
          (driverMarker: google.maps.Marker) => {
            const markerId = driverMarker.get(DRIVER_ID);
            return markerId === driverId;
          }
        );

        if (existingMarker) {
          existingMarker.setPosition(driverPosition);
        } else {
          const newMarker: google.maps.Marker = new google.maps.Marker({
            position: driverPosition
          });
          newMarker.set(DRIVER_ID, driverId);
          newMarker.setMap(this.map);
          this.driverMarkers.push(newMarker);
        }
      }
    }
  };
}

export default compose(
  graphql(UPDATE_LOCATION, {
    name: "reportLocation"
  }),
  graphql(ME, { name: "MeQuery" }),
  graphql(GET_DRIVERS, {
    name: "GetDriversQuery",
    skip: props => {
      return props.MeQuery.me.user.isDriving;
    }
  })
)(HomeContainer);
