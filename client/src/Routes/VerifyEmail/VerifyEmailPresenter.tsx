import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  & form {
    width: 100%;
  }
`;

const Text = styled.span`
  margin-bottom: 30px;
  font-size: 24px;
`;

interface IProps {
  loading: boolean;
  verifyEmail: MutationFn;
}

const VerifyEmailPresenter: React.SFC<IProps> = ({ loading, verifyEmail }) => (
  <Container>
    <Helmet>
      <title>Verify Email | Nuber</title>
    </Helmet>
    <Text>You are all set!</Text>
    <Form onSubmit={verifyEmail}>
      <Button
        disabled={loading}
        text={loading ? "Verifying" : "Verify Email"}
      />
    </Form>
  </Container>
);

VerifyEmailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  verifyEmail: PropTypes.func.isRequired
};

export default VerifyEmailPresenter;
