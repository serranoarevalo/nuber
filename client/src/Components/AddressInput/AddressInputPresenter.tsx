import React from "react";
import styled from "styled-components";
import Form from "../Form";

const AddressBar = styled.input`
  box-shadow: ${props => props.theme.boxShadow};
  background-color: white;
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 2;
  width: 100%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
`;

interface IProps {
  onSubmit: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  width: string;
  disabled?: boolean;
}

const AddressInputPresenter: React.SFC<IProps> = ({
  onSubmit,
  value,
  onChange,
  name,
  placeholder = "",
  width,
  disabled = false
}) => (
  <Form width={width} onSubmit={onSubmit}>
    <AddressBar
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </Form>
);

export default AddressInputPresenter;
