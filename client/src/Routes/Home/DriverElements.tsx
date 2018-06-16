import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
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

const KeyRow = styled.div`
  display: block;
  margin-bottom: 15px;
`;

const Key = styled.span`
  font-weight: 600;
  color: ${props => props.theme.grey};
  display: block;
  margin-bottom: 5px;
`;

const Value = styled.span`
  font-weight: 600;
`;

const User = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  align-items: center;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const DriverElements: React.SFC<IDriverElementsProps> = ({
  hasRequest,
  request,
  acceptRide
}) =>
  hasRequest && request ? (
    <Container>
      <User>
        <Image src={request.passenger.profilePhoto} />
        <Value>{request.passenger.fullName}</Value>
      </User>
      <KeyRow>
        <Key>From:</Key>
        <Value>{request.pickUpLocation}</Value>
      </KeyRow>
      <KeyRow>
        <Key>To:</Key>
        <Value>{request.dropOffLocation}</Value>
      </KeyRow>
      <KeyRow>
        <Key>Price:</Key>
        <Value>${request.price}</Value>
      </KeyRow>
      <Button onClick={acceptRide} text={"Accept Request"} />
    </Container>
  ) : null;

DriverElements.propTypes = {
  hasRequest: PropTypes.bool.isRequired,
  request: PropTypes.object
};

export default DriverElements;
