import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div`
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
`;

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: string;
  loading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CompleteProfilePresenter: React.SFC<IProps> = ({
  email,
  firstName,
  lastName,
  password,
  age,
  handleInputChange,
  onSubmit,
  loading
}) => (
  <Wrapper>
    <Header backTo={"/"} title={"Complete your profile"} />
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          name={"firstName"}
          value={firstName}
          type={"text"}
          required={true}
          displayName={"First Name"}
          onChange={handleInputChange}
        />
        <Input
          name={"lastName"}
          value={lastName}
          type={"text"}
          required={true}
          displayName={"Last Name"}
          onChange={handleInputChange}
        />
        <Input
          name={"email"}
          value={email}
          type={"email"}
          required={true}
          displayName={"Email"}
          onChange={handleInputChange}
        />
        <Input
          name={"age"}
          value={age}
          type={"number"}
          required={true}
          displayName={"Age"}
          onChange={handleInputChange}
        />
        <Input
          name={"password"}
          value={password}
          type={"password"}
          required={true}
          displayName={"Password"}
          onChange={handleInputChange}
        />
        <Button
          onClick={onSubmit}
          text={loading ? "Loading" : "Complete Profile"}
          disabled={loading}
        />
      </form>
    </Container>
  </Wrapper>
);

CompleteProfilePresenter.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CompleteProfilePresenter;
