import React from "react";
import { Query } from "react-apollo";
import PlacesPresenter from "./PlacesPresenter";
import { PLACES } from "./PlacesQueries";

class PlacesContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Query query={PLACES}>
        {({ loading, data, error }) => {
          const { getPlaces: { places = [] } = {} } = data;
          return (
            <PlacesPresenter
              loading={loading}
              places={places}
              addPlaceRedirect={this.addPlaceRedirect}
            />
          );
        }}
      </Query>
    );
  }
  private addPlaceRedirect = () => {
    const { history } = this.props;
    history.push("/add-place");
  };
}

export default PlacesContainer;
