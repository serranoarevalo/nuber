import React from "react";
import { graphql, Query } from "react-apollo";
import { toast } from "react-toastify";
import { ME } from "../../sharedQueries";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

class HomeContainer extends React.Component<any, IState> {
  mapRef: any;
  map: google.maps.Map;
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false,
      lat: 0,
      lng: 0
    };
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(
      this.handleGeoSuccess,
      this.handleGeoError,
      options
    );
  }
  render() {
    const { isMenuOpen } = this.state;
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
    this.setState({
      lat: latitude,
      lng: longitude
    });
  };
  private handleGeoError: PositionErrorCallback = (
    error: PositionError
  ): void => {
    toast.error(`Can't get address, ${error.message}`);
  };
}

export default graphql(ME)(HomeContainer);
