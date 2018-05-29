import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const Container = styled.button`
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
  border: none;
`;

interface ISubmit {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const SubmitButton: React.SFC<ISubmit> = ({ onClick, disabled, loading }) => (
  <Container onClick={onClick} disabled={disabled}>
    {loading ? (
      <FontAwesome name="spinner fa-spin" />
    ) : (
      <FontAwesome name="arrow-right" />
    )}
  </Container>
);

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SubmitButton;
