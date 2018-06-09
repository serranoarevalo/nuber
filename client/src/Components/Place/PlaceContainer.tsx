import PropTypes from "prop-types";
import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import PlacePresenter from "./PlacePresenter";
import { TOGGLE_FAV } from "./PlaceQueries";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  static propTypes = {
    fav: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };
  render() {
    const { fav, name, address, id } = this.props;
    return (
      <Mutation
        mutation={TOGGLE_FAV}
        variables={{ id, fav: !fav }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {(editPlace, { loading }) => (
          <PlacePresenter
            editPlace={editPlace}
            loading={loading}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </Mutation>
    );
  }
}

export default PlaceContainer;
