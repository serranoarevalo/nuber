import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import {
  DataRow,
  ItemTitle,
  ItemValue,
  Wrapper
} from "../../Components/Shared";
import UserCard from "../../Components/UserCard";

const Container = styled.div`
  padding: 15px;
  & input {
    margin-bottom: 10px;
  }
`;

const Header = styled.div`
  background-color: black;
  color: white;
  padding: 15px;
  font-size: 28px;
`;

const Map = styled.div`
  width: 100vw;
  height: 300px;
`;

interface IProps {
  loading: boolean;
  data: any;
  cancelRide: () => void;
  pickUp: () => void;
  mapRef: any;
}

const ACCEPTED = "ACCEPTED";
const ONROUTE = "ONROUTE";
const CANCELED = "CANCELED";

class RidePresenter extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const {
      loading,
      data: { getRide: { isDriver = false, ride = null } = {} } = {},
      cancelRide,
      pickUp,
      mapRef
    } = this.props;
    return (
      <Wrapper>
        <Helmet>
          <title>Ride | Nuber</title>
        </Helmet>
        <Header>Ride</Header>
        {!loading &&
          ride && (
            <React.Fragment>
              <Container>
                <DataRow>
                  <ItemValue>
                    {isDriver ? "Your passenger" : "Your driver"}
                  </ItemValue>
                </DataRow>
                {isDriver ? (
                  <UserCard
                    name={ride.driver.fullName}
                    photo={ride.driver.profilePhoto}
                  />
                ) : (
                  <UserCard
                    name={ride.passenger.fullName}
                    photo={ride.passenger.profilePhoto}
                  />
                )}
                <DataRow>
                  <ItemTitle>From:</ItemTitle>
                  <ItemValue>{ride.pickUpLocation}</ItemValue>
                </DataRow>
                <DataRow>
                  <ItemTitle>To:</ItemTitle>
                  <ItemValue>{ride.dropOffLocation}</ItemValue>
                </DataRow>
                <DataRow>
                  <ItemTitle>Price:</ItemTitle>
                  <ItemValue>${ride.price}</ItemValue>
                </DataRow>
                <DataRow>
                  <ItemTitle>Status:</ItemTitle>
                  {ride.status === ACCEPTED && <ItemValue>Accepted</ItemValue>}
                  {ride.status === ONROUTE && <ItemValue>On Route</ItemValue>}
                  {ride.status === CANCELED && <ItemValue>Canceled</ItemValue>}
                </DataRow>
                {isDriver && (
                  <React.Fragment>
                    <Button
                      onClick={pickUp}
                      bgColor={"#2ecc71"}
                      text={"Picked up"}
                    />
                    <Button
                      onClick={cancelRide}
                      bgColor={"#e74c3c"}
                      text={"Cancel"}
                    />
                  </React.Fragment>
                )}
              </Container>
            </React.Fragment>
          )}
        <Map innerRef={mapRef} />
      </Wrapper>
    );
  }
}

export default RidePresenter;
