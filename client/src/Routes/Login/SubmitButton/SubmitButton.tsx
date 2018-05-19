import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  position: absolute;
  bottom: 50px;
  right: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: all 0.5 linear;
`;

interface ISubmit {
  onClick?: () => void;
}

const SubmitButton: React.SFC<ISubmit> = () => (
  <Container>
    <FontAwesome name="arrow-right" />
  </Container>
);
export default SubmitButton;
