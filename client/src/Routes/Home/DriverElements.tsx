import PropTypes from "prop-types";
import React from "react";
import { IDriverElementsProps } from "./HomeInterfaces";

const DriverElements: React.SFC<IDriverElementsProps> = ({
  hasRequest,
  request
}) => null;

DriverElements.propTypes = {
  hasRequest: PropTypes.bool.isRequired,
  request: PropTypes.object
};

export default DriverElements;
