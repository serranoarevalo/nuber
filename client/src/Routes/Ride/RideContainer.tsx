import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import ReactDOM from "react-dom";
import {
  GET_RIDE,
  RIDE_EVENTS_SUBSCRIPTION,
  UPDATE_RIDE
} from "../../sharedQueries";
import RidePresenter from "./RidePresenter";

interface IProps {
  location: any;
  history: any;
  google: any;
  UpdateRideMutation: MutationFn;
}

const ONROUTE = "ONROUTE";
// const FINISHED = "FINISHED";
const CANCELED = "CANCELED";
// const REQUESTING = "REQUESTING";

class RideContainer extends React.Component<IProps> {
  map: google.maps.Map;
  mapRef: any;

  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.loadMap();
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
              mapRef={this.mapRef}
            />
          );
        }}
      </Query>
    );
  }
  private updateQuery = (previousData, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return previousData;
    }

    const {
      data: {
        rideUpdate: { status }
      }
    } = subscriptionData;

    previousData.getRide.ride.status;

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

  private loadMap = () => {
    const { google } = this.props;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat: 41.036758, lng: 28.978035499999997 },
      zoom: 16,
      mapTypeId: "roadmap",
      disableDefaultUI: true
    };
    this.map = new maps.Map(node, mapConfig);
  };
}

export default graphql<any, any>(UPDATE_RIDE, {
  name: "UpdateRideMutation"
})(RideContainer);
