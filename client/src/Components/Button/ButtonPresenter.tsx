import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Button = styled<any, any>("input")`
  width: ${props => props.width};
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
  &:disabled {
    opacity: 0.8;
  }
`;

interface IProps {
  text: string;
  disabled: boolean;
  onClick?: any;
  width?: string;
}

const ButtonPresenter: React.SFC<IProps> = ({
  text,
  disabled,
  onClick = null,
  width = "100%"
}) => (
  <Button
    width={width}
    type="submit"
    disabled={disabled}
    value={text}
    onClick={onClick}
  />
);

ButtonPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string
};

export default ButtonPresenter;
