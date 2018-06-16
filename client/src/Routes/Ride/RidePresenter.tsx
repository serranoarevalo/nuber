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

interface IProps {
  loading: boolean;
  data: any;
  cancelRide: () => void;
  pickUp: () => void;
  redirectToChat: () => void;
}

const ACCEPTED = "ACCEPTED";
const ONROUTE = "ONROUTE";
const CANCELED = "CANCELED";

const RidePresenter: React.SFC<IProps> = ({
  loading,
  data: { getRide: { isDriver = false, ride = null } = {} } = {},
  cancelRide,
  pickUp,
  redirectToChat
}) => (
  <Wrapper>
    <Helmet>
      <title>Ride | Nuber</title>
    </Helmet>
    <Header>Ride</Header>
    {!loading &&
      ride && (
        <Container>
          <DataRow>
            <ItemValue>{isDriver ? "Your passenger" : "Your driver"}</ItemValue>
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
          <Button
            onClick={redirectToChat}
            text={`Send message to ${isDriver ? "passenger" : "driver"}`}
          />
          {isDriver && (
            <React.Fragment>
              <Button onClick={pickUp} bgColor={"#1abc9c"} text={"Picked up"} />
              <Button
                onClick={cancelRide}
                bgColor={"#e74c3c"}
                text={"Cancel"}
              />
            </React.Fragment>
          )}
        </Container>
      )}
  </Wrapper>
);

export default RidePresenter;
