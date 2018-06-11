import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const Marker = styled.span`
  width: 20px;
  height: 20px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  color: #f1c40f;
  font-size: 25px;
`;

const MarkerPresenter = () => (
  <Marker>
    <FontAwesome name={"map-marker"} />
  </Marker>
);

export default MarkerPresenter;
