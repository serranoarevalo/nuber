import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: black;
  height: 100vh;
`;

interface IProps {
  email: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({ email }) => (
  <Container>
    <span>hello</span>
  </Container>
);

export default EmailLoginPresenter;
