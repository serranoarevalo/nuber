import PropTypes from "prop-types";
import React from "react";
// import styled from "styled-components";

interface IProps {
  isMe: boolean;
  text: string;
}

const MessagePresenter: React.SFC<IProps> = ({ isMe, text }) => (
  <div>{text}</div>
);

MessagePresenter.propTypes = {
  isMe: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default MessagePresenter;
