import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import {
  GET_RIDE,
  RIDE_EVENTS_SUBSCRIPTION,
  UPDATE_RIDE
} from "../../sharedQueries";
import RidePresenter from "./RidePresenter";

interface IProps {
  location: any;
  history: any;
  UpdateRideMutation: MutationFn;
}

const ONROUTE = "ONROUTE";
// const FINISHED = "FINISHED";
const CANCELED = "CANCELED";
// const REQUESTING = "REQUESTING";

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }
  render() {
    const {
      location: {
        state: { rideId }
      }
    } = this.props;
    return (
      <Query query={GET_RIDE} variables={{ skip: false, rideId }}>
        {({ data, loading, subscribeToMore }) => {
          const subscribeOptions: SubscribeToMoreOptions = {
            document: RIDE_EVENTS_SUBSCRIPTION,
            updateQuery: this.updateQuery
          };
          subscribeToMore(subscribeOptions);
          return (
            <RidePresenter
              data={data}
              loading={loading}
              cancelRide={this.cancelRide}
              pickUp={this.pickUp}
              redirectToChat={this.redirectToChat}
            />
          );
        }}
      </Query>
    );
  }
  private updateQuery = (previousData, { subscriptionData }) => {
    const { history } = this.props;
    if (!subscriptionData.data) {
      return previousData;
    }

    const {
      data: {
        rideUpdate: { status }
      }
    } = subscriptionData;

    if (status === CANCELED) {
      history.push("/");
      location.reload();
    }

    return Object.assign({}, previousData, {
      getRide: {
        ...previousData.getRide,
        ride: {
          ...previousData.getRide.ride,
          status
        }
      }
    });
  };

  private cancelRide = () => {
    const {
      location: {
        state: { rideId }
      }
    } = this.props;
    const { UpdateRideMutation } = this.props;
    UpdateRideMutation({
      variables: {
        rideId,
        status: CANCELED
      }
    });
  };

  private pickUp = () => {
    const {
      location: {
        state: { rideId }
      }
    } = this.props;
    const { UpdateRideMutation } = this.props;
    UpdateRideMutation({
      variables: {
        rideId,
        status: ONROUTE
      }
    });
  };

  private redirectToChat = () => {
    const { history, location } = this.props;
    const {
      state: { rideId }
    } = location;
    history.push({
      pathname: "/chat",
      state: {
        rideId
      }
    });
  };
}

export default graphql<any, any>(UPDATE_RIDE, {
  name: "UpdateRideMutation"
})(RideContainer);
