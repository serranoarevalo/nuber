import React from "react";
import { toast } from "react-toastify";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.5665,
      lng: 126.978
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  render() {
    const { google } = this.props;
    const { lat, lng } = this.state;
    return <FindAddressPresenter lat={lat} lng={lng} google={google} />;
  }
  private handleGeoError = error => {
    toast.error(`Can't get address, ${error.message}`);
  };
  private handleGeoSuccess = (position: Position) => {
    toast.success("Located you! Refreshing...");
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
  };
}

export default FindAddressContainer;
