import React from "react";
import { graphql, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { ME } from "../../sharedQueries";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  fromAddress: string;
  toLat: number;
  toLng: number;
  toAddress: string;
}

class HomeContainer extends React.Component<any, IState> {
  mapRef: any;
  map: google.maps.Map;
  userMarker: google.maps.Marker;
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false,
      lat: 0,
      lng: 0,
      toLat: 0,
      toLng: 0,
      toAddress: "",
      fromAddress: ""
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
    const { isMenuOpen, toAddress } = this.state;
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
            geoCode={this.geoCodeAddress}
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
      disableDefaultUI: true
    };
    this.map = new maps.Map(node, mapConfig);
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
    this.map.panTo(latLng);
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
  private geoCodeAddress = (): void => {
    // stuff
  };
}

export default graphql(ME)(HomeContainer);
