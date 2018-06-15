import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { IDriverElementsProps } from "./HomeInterfaces";

const Container = styled.div`
  position: absolute;
  margin: auto;
  width: 50vw;
  height: 50vw;
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 5px;
`;

const DriverElements: React.SFC<IDriverElementsProps> = ({
  hasRequest,
  request
}) =>
  hasRequest && request ? <Container>Somebody has a request!</Container> : null;

DriverElements.propTypes = {
  hasRequest: PropTypes.bool.isRequired,
  request: PropTypes.object
};

export default DriverElements;
