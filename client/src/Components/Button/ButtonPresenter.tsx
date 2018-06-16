import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Button = styled<any, any>("input")`
  width: ${props => props.width};
  background-color: ${props => props.bgColor};
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
  disabled?: boolean;
  onClick?: any;
  width?: string;
  bgColor?: string;
}

const ButtonPresenter: React.SFC<IProps> = ({
  text,
  disabled = false,
  onClick = null,
  width = "100%",
  bgColor = "black"
}) => (
  <Button
    width={width}
    type="submit"
    disabled={disabled}
    value={text}
    onClick={onClick}
    bgColor={bgColor}
  />
);

ButtonPresenter.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  width: PropTypes.string
};

export default ButtonPresenter;
