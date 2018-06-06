import throttle from "lodash.throttle";
import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  mapRef: any;
  map: google.maps.Map;
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.5665,
      lng: 126.978
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
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
  private handleGeoError = error => {
    toast.error(`Can't get address, ${error.message}`);
  };
  private handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.loadMap(latitude, longitude);
  };
  private loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat, lng },
      zoom: 13,
      mapTypeId: "roadmap",
      disableDefaultUI: true
    };
    this.map = new maps.Map(node, mapConfig);
    this.map.addListener(
      "center_changed",
      throttle(this.handleCenterChange, 2000)
    );
  };
  private handleCenterChange = () => {
    const center = this.map.getCenter();
    console.log(center.lat(), center.lng());
  };
}

export default FindAddressContainer;
