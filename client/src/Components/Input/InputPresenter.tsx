import PropTypes from "prop-types";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 35px;
`;

const Label = styled.label`
  color: #7f8c8d;
  display: block;
  margin-bottom: 30px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #7f8c8d;
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: black;
  }
`;

interface IProps {
  name: string;
  type: string;
  value?: string;
  required: boolean;
  displayName: string;
  onChange: (event: ChangeEvent<any>) => void;
  defaultValue?: string;
  placeholder?: string;
  minLenght?: number;
}

const InputPresenter: React.SFC<IProps> = ({
  value,
  onChange,
  type,
  name,
  required,
  displayName,
  defaultValue,
  placeholder,
  minLenght
}) => (
  <Container>
    <Label htmlFor={name}>{displayName}</Label>
    <Input
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      minLength={minLenght}
    />
  </Container>
);

InputPresenter.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string
};

export default InputPresenter;
