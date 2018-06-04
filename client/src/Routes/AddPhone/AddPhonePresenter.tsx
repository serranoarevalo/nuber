import React from "react";
import { MutationFn } from "react-apollo";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Select from "../../Components/Select";
import countries from "../../countries";

const Container = styled.div`
  padding: 0 15px;
  padding-top: 150px;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

interface IProps {
  countryCode: string;
  phoneNumber: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const AddPhonePresenter: React.SFC<IProps> = ({
  countryCode,
  phoneNumber,
  handleInputChange,
  onSubmit,
  loading
}) => (
  <Wrapper>
    <Header backTo="/add-phone" title={"Add your phone"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <Select
          name={"countryCode"}
          displayName={"Country Code"}
          value={countryCode}
          onChange={handleInputChange}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.dial_code}>
              {country.flag} ({country.dial_code}) {country.name}
            </option>
          ))}
        </Select>
        <Input
          name={"phoneNumber"}
          type={"tel"}
          required={true}
          displayName={"Phone Number"}
          onChange={handleInputChange}
          minLenght={5}
        />
        <Button
          disabled={loading}
          text={loading ? "Sending SMS" : "Add Phone"}
        />
      </Form>
    </Container>
  </Wrapper>
);

export default AddPhonePresenter;
