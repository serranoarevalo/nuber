import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { Query } from "react-apollo";
import { GET_RIDE, RIDE_EVENTS_SUBSCRIPTION } from "../../sharedQueries";
import RidePresenter from "./RidePresenter";

interface IProps {
  location: any;
  history: any;
}

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
          console.log(data);
          const subscribeOptions: SubscribeToMoreOptions = {
            document: RIDE_EVENTS_SUBSCRIPTION,
            updateQuery: this.updateQuery
          };
          subscribeToMore(subscribeOptions);
          return <RidePresenter data={data} loading={loading} />;
        }}
      </Query>
    );
  }
  private updateQuery = (previousData, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return previousData;
    }
    const {
      data: { rideUpdate }
    } = subscriptionData;
    return rideUpdate;
  };
}

export default RideContainer;
