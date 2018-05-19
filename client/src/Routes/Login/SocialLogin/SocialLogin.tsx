import React from "react";
import styled from "styled-components";
import { loginMethodType } from "../LoginTypes";

interface ISocial {
  hidding: boolean;
}

const Social = styled<ISocial, any>("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 7%;
  border-top: 1px solid rgba(41, 128, 185, 0.5);
  transition: opacity 0.3s linear;
  opacity: ${props => (props.hidding ? "0" : "1")};
  padding: 0 15px;
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
`;

interface IProps {
  loginMethod: loginMethodType;
}

const SocialLogin: React.SFC<IProps> = ({ loginMethod }) => (
  <Social hidding={loginMethod === "mobile"}>
    <SocialText>Or connect with social</SocialText>
  </Social>
);

export default SocialLogin;
