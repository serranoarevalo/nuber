import React from "react";
import { Mutation } from "react-apollo";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

interface IState {
  address: string;
  name: string;
  latlong: string;
  fav: boolean;
}

class AddPlaceContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fav: false,
      name: "",
      address: "",
      latlong: ""
    };
  }
  render() {
    const { fav, name, address, latlong } = this.state;
    return (
      <Mutation
        mutation={ADD_PLACE}
        variables={{ variables: { fav, name, address, latlong } }}
      >
        {(addPlace, { loading }) => (
          <AddPlacePresenter
            fav={fav}
            name={name}
            address={address}
            latlong={latlong}
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
