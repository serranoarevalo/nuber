import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 35px;
`;

const Label = styled.label`
  color: ${props => props.theme.grey};
  display: block;
  margin-bottom: 30px;
`;

const Select = styled.select`
  font-size: 20px;
  color: "#2c3e50";
  webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

interface IProps {
  children: any;
  name: string;
  displayName: string;
  value: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SelectPresenter: React.SFC<IProps> = ({
  children,
  name,
  displayName,
  value,
  onChange
}) => (
  <Container>
    <Label>{displayName}</Label>
    <Select value={value} name={name} onChange={onChange}>
      {children}
    </Select>
  </Container>
);

export default SelectPresenter;
