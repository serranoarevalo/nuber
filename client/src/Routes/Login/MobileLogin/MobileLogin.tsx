import React from "react";
import styled from "styled-components";
import { loginMethodType } from "../LoginTypes";

interface IStyledMobile {
  loginMethod: loginMethodType;
}

const StyledMobile = styled<IStyledMobile, any>("div")`
  background-color: white;
  padding: 0px 15px;
  will-change: maxHeight;
  transition: all 0.1s linear;
  display: flex;
  height: 15%;
  flex-direction: column;
  transition: all 10s linear;
  animation-delay: 0.5s;
  justify-content: ${props =>
    props.loginMethod === "" ? "center" : "flex-start"};
`;

const Title = styled.div`
  font-size: 28px;
  display: block;
  margin-bottom: 20px;
`;

interface IProps {
  onClick: () => void;
  loginMethod: loginMethodType;
  children: React.ReactNode;
}

const MobileLogin: React.SFC<IProps> = ({ onClick, loginMethod, children }) => (
  <StyledMobile
    onClick={onClick}
    pose={loginMethod === "mobile" ? "open" : "closed"}
    loginMethod={loginMethod}
  >
    <Title>Get moving with Nuber</Title>
    <span>{children}</span>
  </StyledMobile>
);

export default MobileLogin;
