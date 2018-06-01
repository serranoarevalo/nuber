import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

const Text = styled.span`
  margin-bottom: 30px;
  font-size: 24px;
`;

interface IProps {
  loading: boolean;
  verifyEmail: () => void;
}

const VerifyEmailPresenter: React.SFC<IProps> = ({ loading, verifyEmail }) => (
  <Container>
    <Text>You are all set!</Text>
    <Button
      disabled={loading}
      text={loading ? "Verifying" : "Verify Email"}
      onClick={verifyEmail}
    />
  </Container>
);

VerifyEmailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  verifyEmail: PropTypes.func.isRequired
};

export default VerifyEmailPresenter;
