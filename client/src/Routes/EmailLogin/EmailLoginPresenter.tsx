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
  loading: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({
  email,
  password,
  handleInputChange,
  loading,
  onSubmit
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Login with Email"} />
    <Container>
      <form onSubmit={onSubmit}>
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
        <Button
          onClick={onSubmit}
          text={loading ? "Logging In..." : "Log In"}
          disabled={loading}
        />
      </form>
    </Container>
  </Wrapper>
);

EmailLoginPresenter.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EmailLoginPresenter;
