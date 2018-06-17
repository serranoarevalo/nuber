import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { Container, Wrapper } from "../../Components/Shared";
import Message from "./Message";

interface IProps {
  loading: boolean;
  data: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  handleSubmit: () => void;
  userId: number;
}

const Messages = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
`;

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { getChat: { chat: { messages = [] } = {} } = {} } = {},
  handleInputChange,
  message,
  handleSubmit,
  userId
}) => (
  <Wrapper>
    <Helmet>
      <title>Chat | Nuber</title>
    </Helmet>
    <Header title={"Chat"} goBack={true} backTo={"/ride"} />
    <Container>
      <Messages>
        {!loading &&
          messages
            .map(aMessage => (
              <Message
                isMe={aMessage.userId === userId}
                text={aMessage.message}
                key={aMessage.id}
              />
            ))
            .reverse()}
      </Messages>
      <Form onSubmit={handleSubmit}>
        <Input
          displayName={""}
          required={true}
          type={"text"}
          name={"message"}
          value={message}
          onChange={handleInputChange}
          placeholder={"Type your message"}
        />
      </Form>
      <Button text={"Send message"} width="100%" onClick={handleSubmit} />
    </Container>
  </Wrapper>
);

export default ChatPresenter;
