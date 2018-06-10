import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { GOOGLE_MAPS_API } from "../../keys";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

interface IProps {
  google: any;
  history: any;
  location: any;
}

class FindAddressContainer extends React.Component<IProps, IState> {
  mapRef: any;
  map: google.maps.Map;
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.5665,
      lng: 126.978,
      address: ""
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
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        handleInputChange={this.handleInputChange}
        geoCode={this.geoCode}
        pickAddress={this.pickAddress}
      />
    );
  }
  private handleGeoError: PositionErrorCallback = (error: PositionError) => {
    toast.error(`Can't get address, ${error.message}`);
  };
  private handleGeoSuccess: PositionCallback = (position: Position) => {
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
  private loadMap = () => {
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
    this.reverseGeocode();
    this.map.addListener("dragend", this.handleCenterChange);
    const userMarker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      icon: {
        url: require("../../images/marker.png"),
        scaledSize: new google.maps.Size(20, 20)
      }
    });
    userMarker.setMap(this.map);
  };
  private handleCenterChange = () => {
    const center = this.map.getCenter();
    const lat = center.lat();
    const lng = center.lng();
    this.setState(
      {
        lat,
        lng
      },
      this.reverseGeocode
    );
  };
  private reverseGeocode = async () => {
    const { lat, lng } = this.state;
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API}`;
    const { status, data } = await axios.get(URL);
    if (status === 200) {
      const { results } = data;
      const firstAddress = results[0];
      const address = firstAddress.formatted_address;
      this.setState({
        address
      });
    }
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
  private geoCode = async () => {
    const { address } = this.state;
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API}`;
    const { status, data } = await axios.get(URL);
    if (status === 200) {
      const { results } = data;
      const place = results[0];
      const {
        geometry: {
          location: { lat, lng }
        }
      } = place;
      this.setState({
        lat,
        lng
      });
      this.map.panTo({ lat, lng });
    }
  };
  private pickAddress = (): void => {
    const { location, history } = this.props;
    const { lat, lng, address } = this.state;
    const {
      state: { backTo }
    } = location;
    history.push({
      pathname: backTo,
      state: { address, lat, lng }
    });
  };
}

export default FindAddressContainer;
