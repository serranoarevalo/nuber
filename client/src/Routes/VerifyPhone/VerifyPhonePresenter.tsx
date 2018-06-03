import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const Container = styled.div`
  padding: 0 15px;
  padding-top: 150px;
`;

interface IProps {
  verificationKey: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  loading: boolean;
  onSubmit: MutationFn;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  handleInputChange,
  loading,
  onSubmit
}) => (
  <Wrapper className={"shouldScroll"}>
    <Helmet>
      <title>Verify Phone | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Verify your phone"} />
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="verificationKey"
          type={"tel"}
          value={verificationKey}
          required={true}
          onChange={handleInputChange}
          displayName={"Enter the verification key sent on the SMS"}
        />
        <Button
          onClick={onSubmit}
          text={loading ? "Loading" : "Verify phone"}
          disabled={loading}
        />
      </Form>
    </Container>
  </Wrapper>
);

VerifyPhonePresenter.propTypes = {
  verificationKey: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default VerifyPhonePresenter;
