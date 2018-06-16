import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import { DataRow, ItemTitle, ItemValue } from "../../Components/Shared";
import UserCard from "../../Components/UserCard";
import { IDriverElementsProps } from "./HomeInterfaces";

const Container = styled.div`
  position: absolute;
  margin: auto;
  width: 80vw;
  height: 100vw;
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 5px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DriverElements: React.SFC<IDriverElementsProps> = ({
  hasRequest,
  request,
  acceptRide
}) =>
  hasRequest && request ? (
    <Container>
      <UserCard
        photo={request.passenger.profilePhoto}
        name={request.passenger.fullName}
      />
      <DataRow>
        <ItemTitle>From:</ItemTitle>
        <ItemValue>{request.pickUpLocation}</ItemValue>
      </DataRow>
      <DataRow>
        <ItemTitle>To:</ItemTitle>
        <ItemValue>{request.dropOffLocation}</ItemValue>
      </DataRow>
      <DataRow>
        <ItemTitle>Price:</ItemTitle>
        <ItemValue>${request.price}</ItemValue>
      </DataRow>
      <Button onClick={acceptRide} text={"Accept Request"} />
    </Container>
  ) : null;

DriverElements.propTypes = {
  hasRequest: PropTypes.bool.isRequired,
  request: PropTypes.object
};

export default DriverElements;
