import React from "react";
import { Query } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import PlacesPresenter from "./PlacesPresenter";

class PlacesContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Query query={GET_PLACES}>
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
