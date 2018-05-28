import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  email: string;
  password: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({
  email,
  password,
  handleInputChange
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Login with Email"} />
    <Container>
      <Input
        onChange={handleInputChange}
        value={email}
        type="email"
        required={true}
        name={"Email"}
      />
      <Input
        onChange={handleInputChange}
        value={password}
        type="password"
        required={true}
        name={"Password"}
      />
      <Button onClick={handleInputChange} text={"Log In"} />
    </Container>
  </Wrapper>
);

EmailLoginPresenter.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default EmailLoginPresenter;
