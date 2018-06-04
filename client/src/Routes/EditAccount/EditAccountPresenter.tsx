import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import styled from "styled-components";
import Button from "../../Components/Button";
import FileInput from "../../Components/FileInput";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

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
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Edit Account"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <FileInput
          postUpload={getProfileImage}
          required={true}
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
          required={true}
          displayName={"Password"}
          placeholder={"••••••"}
        />
        <Button
          onClick={onSubmit}
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
  onSubmit: PropTypes.func.isRequired
};

export default EditAccountPresenter;
