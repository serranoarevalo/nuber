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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
  password: string;
  profilePhoto: string;
  getProfileImage: (url: string) => void;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  handleInputChange,
  loading,
  onSubmit,
  password,
  profilePhoto,
  getProfileImage
}) => (
  <Wrapper>
    <Helmet>
      <title>Edit Account | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Edit Account"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <FileInput
          postUpload={getProfileImage}
          required={false}
          previousUrl={profilePhoto}
        />
        <Input
          onChange={handleInputChange}
          value={firstName}
          name={"firstName"}
          type={"text"}
          required={true}
          displayName={"First Name"}
        />
        <Input
          onChange={handleInputChange}
          value={lastName}
          name={"lastName"}
          type={"text"}
          required={true}
          displayName={"Last Name"}
        />
        <Input
          onChange={handleInputChange}
          value={phoneNumber}
          name={"phoneNumber"}
          type={"tel"}
          required={true}
          displayName={"Phone Number"}
        />
        <Input
          onChange={handleInputChange}
          value={email}
          name={"email"}
          type={"tel"}
          required={true}
          displayName={"Email"}
        />
        <Input
          onChange={handleInputChange}
          value={password}
          name={"password"}
          type={"password"}
          required={false}
          displayName={"Password"}
          placeholder={"••••••"}
        />
        <Button
          text={loading ? "Updating Profile" : "Update Profile"}
          disabled={loading}
        />
      </Form>
    </Container>
  </Wrapper>
);

EditAccountPresenter.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  password: PropTypes.string,
  profilePhoto: PropTypes.string,
  getProfileImage: PropTypes.func.isRequired
};

export default EditAccountPresenter;
