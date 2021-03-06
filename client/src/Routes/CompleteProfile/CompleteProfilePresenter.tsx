import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import Button from "../../Components/Button";
import FileInput from "../../Components/FileInput";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { Container, Wrapper } from "../../Components/Shared";

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: string;
  loading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  getProfileImage: (url: string) => void;
}

const CompleteProfilePresenter: React.SFC<IProps> = ({
  email,
  firstName,
  lastName,
  password,
  age,
  handleInputChange,
  onSubmit,
  loading,
  getProfileImage
}) => (
  <Wrapper className={"shouldScroll"}>
    <Helmet>
      <title>Complete Profile | Nuber</title>
    </Helmet>
    <Header backTo={"/"} title={"Complete your profile"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <FileInput required={true} postUpload={getProfileImage} />
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
          text={loading ? "Loading" : "Complete Profile"}
          disabled={loading}
        />
      </Form>
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
  onSubmit: PropTypes.func.isRequired,
  getProfileImage: PropTypes.func.isRequired
};

export default CompleteProfilePresenter;
