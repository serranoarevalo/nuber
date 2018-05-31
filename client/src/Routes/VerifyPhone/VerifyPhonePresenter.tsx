import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  overflow-y: scroll;
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
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  handleInputChange,
  loading,
  onSubmit
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Verify your phone"} />
    <Container>
      <form onSubmit={onSubmit}>
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
      </form>
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
