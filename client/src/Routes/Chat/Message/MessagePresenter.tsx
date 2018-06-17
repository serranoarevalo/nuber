import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Message = styled.div`
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

interface IProps {
  isMe: boolean;
  text: string;
}

const MessagePresenter: React.SFC<IProps> = ({ isMe, text }) => (
  <Message>{text}</Message>
);

MessagePresenter.propTypes = {
  isMe: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default MessagePresenter;
