import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Message = styled<any, any>("div")`
  background-color: ${props => (props.isMe ? "#3498db" : "#ecf0f1")};
  color: ${props => (props.isMe ? "white" : "black")};
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  width: 50%;
  align-self: ${props => (props.isMe ? "flex-end" : "flex-start")};
  border-bottom-right-radius: ${props => (props.isMe ? "0" : "15px")};
  border-bottom-left-radius: ${props => (props.isMe ? "15px" : "0")};
`;

interface IProps {
  isMe: boolean;
  text: string;
}

const MessagePresenter: React.SFC<IProps> = ({ isMe = true, text }) => (
  <Message isMe={isMe}>{text}</Message>
);

MessagePresenter.propTypes = {
  isMe: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default MessagePresenter;
