import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE, USER_PLACES_FRAGMENT } from "./AddPlaceQueries";

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
        variables={{ fav, name, address, lat, lng }}
        update={this.handlePostSubmit}
      >
        {(addPlace, { loading }) => (
          <AddPlacePresenter
            fav={fav}
            name={name}
            address={address}
            onSubmit={addPlace}
            loading={loading}
            handleInputChange={this.handleInputChange}
            goToFindAddress={this.goToFindAddress}
          />
        )}
      </Mutation>
    );
  }

  private goToFindAddress = () => {
    const { history } = this.props;
    history.push({
      pathname: "/find-address",
      state: {
        backTo: "/add-place"
      }
    });
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

  private handlePostSubmit: MutationUpdaterFn = (
    cache,
    { data }: { data: any }
  ) => {
    const { addPlace } = data;
    if (!addPlace.ok && addPlace.error) {
      toast.error(addPlace.error);
    } else if (addPlace.ok) {
      toast.success("Place created");
      const placesFragment: any = cache.readFragment({
        fragment: USER_PLACES_FRAGMENT,
        id: "$ROOT_QUERY.me.user"
      });
      if (placesFragment) {
        const places = placesFragment.places;
        console.log(places);
        cache.writeFragment({
          id: "$ROOT_QUERY.me.user",
          fragment: USER_PLACES_FRAGMENT,
          data: {
            places: places ? places.push(addPlace.place) : [addPlace.place],
            __typename: "User"
          }
        });
      }
    }
  };
}

export default AddPlaceContainer;
