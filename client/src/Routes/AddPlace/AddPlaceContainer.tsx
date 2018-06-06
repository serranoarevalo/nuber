import React from "react";
import { Mutation } from "react-apollo";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

interface IState {
  address: string;
  name: string;
  lat: string;
  lng: string;
  fav: boolean;
}

/* interface IAddress {
  address: string;
  lat: string;
  lng: string;
} */

class AddPlaceContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    if (!props.location.state) {
      this.state = {
        fav: false,
        name: "",
        address: "",
        lat: "",
        lng: ""
      };
    } else {
      const {
        location: {
          state: { address, lat, lng }
        }
      } = props;
      this.state = {
        fav: false,
        name: "",
        address,
        lat,
        lng
      };
    }
  }
  render() {
    const { fav, name, address, lat, lng } = this.state;
    return (
      <Mutation
        mutation={ADD_PLACE}
        variables={{ variables: { fav, name, address, lat, lng } }}
      >
        {(addPlace, { loading }) => (
          <AddPlacePresenter
            fav={fav}
            name={name}
            address={address}
            onSubmit={addPlace}
            loading={loading}
            handleInputChange={this.handleInputChange}
          />
        )}
      </Mutation>
    );
  }

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
}

export default AddPlaceContainer;
