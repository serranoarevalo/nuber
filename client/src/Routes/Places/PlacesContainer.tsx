import React from "react";
import PlacesPresenter from "./PlacesPresenter";

class PlacesContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return <PlacesPresenter addPlaceRedirect={this.addPlaceRedirect} />;
  }
  private addPlaceRedirect = () => {
    const { history } = this.props;
    history.push("/add-place");
  };
}

export default PlacesContainer;
