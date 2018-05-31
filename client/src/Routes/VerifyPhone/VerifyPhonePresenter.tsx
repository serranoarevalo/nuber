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
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  handleInputChange
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Verify your phone"} />
    <Container>
      <form>
        <Input
          name="verificationKey"
          type={"tel"}
          value={verificationKey}
          required={true}
          onChange={handleInputChange}
          displayName={"Enter the verification key sent on the SMS"}
        />
        <Button
          onClick={handleInputChange}
          text={"Verify phone"}
          disabled={false}
        />
      </form>
    </Container>
  </Wrapper>
);

VerifyPhonePresenter.propTypes = {
  verificationKey: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
};

export default VerifyPhonePresenter;
