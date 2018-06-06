import React from "react";
import { Mutation } from "react-apollo";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

interface IState {
  address: string;
  name: string;
  lat: string;
  long: string;
  fav: boolean;
}

interface IAddress {
  address: string;
  lat: string;
  long: string;
}

class AddPlaceContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fav: false,
      name: "",
      address: "",
      lat: "",
      long: ""
    };
  }
  render() {
    const { fav, name, address, lat, long } = this.state;
    return (
      <Mutation
        mutation={ADD_PLACE}
        variables={{ variables: { fav, name, address, lat, long } }}
      >
        {(addPlace, { loading }) => (
          <AddPlacePresenter
            fav={fav}
            name={name}
            address={address}
            lat={lat}
            long={long}
            onSubmit={addPlace}
            loading={loading}
            handleInputChange={this.handleInputChange}
            saveAddress={this.saveAddress}
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

  private saveAddress = (addressObj: IAddress): void => {
    const { lat, long, address } = addressObj;
    this.setState({
      lat,
      long,
      address
    });
  };
}

export default AddPlaceContainer;
