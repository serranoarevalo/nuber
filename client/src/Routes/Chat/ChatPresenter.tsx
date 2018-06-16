import React from "react";
import { Helmet } from "react-helmet";
// import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { Container, Wrapper } from "../../Components/Shared";

const ChatPresenter: React.SFC = () => (
  <Wrapper>
    <Helmet>
      <title>Chat | Nuber</title>
    </Helmet>
    <Header title={"Chat"} goBack={true} backTo={"/ride"} />
    <Container>
      <Button text={"Send message"} onClick={null} />
    </Container>
  </Wrapper>
);

export default ChatPresenter;
