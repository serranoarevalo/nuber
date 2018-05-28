import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  &:active,
  &:focus {
    outline: none;
  }
`;

interface IProps {
  onClick: any;
  text: string;
}

const ButtonPresenter: React.SFC<IProps> = ({ onClick, text }) => (
  <Button onClick={onClick}>{text}</Button>
);

ButtonPresenter.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default ButtonPresenter;
