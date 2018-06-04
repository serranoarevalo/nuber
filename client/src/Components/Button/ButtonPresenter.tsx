import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Button = styled.input`
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
  text: string;
  disabled: boolean;
}

const ButtonPresenter: React.SFC<IProps> = ({ text, disabled }) => (
  <Button type="submit" disabled={disabled} value={text} />
);

ButtonPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ButtonPresenter;
