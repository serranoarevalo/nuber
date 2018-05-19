import React from "react";
import styled, { keyframes } from "styled-components";
import { loginMethodType } from "../LoginTypes";

interface IStyledMobile {
  loginMethod: loginMethodType;
}

const animation = keyframes`
  from {
    justify-content: center;
  }
  to {
    justify-content:flex-start;
  }
`;

const StyledMobile = styled<IStyledMobile, any>("div")`
  background-color: white;
  padding: 0px 15px;
  will-change: maxHeight;
  transition: all 0.1s linear;
  display: flex;
  height: 15%;
  flex-direction: column;
  transition: all 10s linear;
  justify-content: ${props =>
    props.loginMethod === "" ? "center" : "flex-start"};
  ${props => {
    if (props.loginMethod !== "") {
      return `animation: ${animation} .3s linear`;
    } else {
      return;
    }
  }};
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
