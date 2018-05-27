import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div`
  width: 100%;
  padding-top: 150px;
  height: 1000vh;
`;

const Wrapper = styled.div``;

interface IProps {
  email: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({ email }) => (
  <Wrapper>
    <Header backTo="/" title={"Login with Email"} />
    <Container>
      <span>hello</span>
    </Container>
  </Wrapper>
);

export default EmailLoginPresenter;
