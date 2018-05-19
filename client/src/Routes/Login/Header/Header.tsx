import { tween } from "popmotion";
import React from "react";
import posed from "react-pose";
import styled from "styled-components";
import bg from "../../../images/bg.png";
import { loginMethodType } from "../LoginTypes";

const PosedHeader = posed.div({
  closed: {
    maxHeight: "50px",
    opacity: 0,
    transition: (props: any) => tween({ ...props, duration: 300 })
  },
  open: {
    maxHeight: "1000px",
    opacity: 1,
    transition: (props: any) => tween({ ...props, duration: 300 })
  }
});

const StyledHeader = styled<any, any>(PosedHeader)`
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bg});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78%;
  will-change: maxHeight;
`;

const Logo = styled.span`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

interface IHeader {
  onClick: () => void;
  loginMethod: loginMethodType;
}

const Header: React.SFC<IHeader> = ({ onClick, loginMethod }) => (
  <StyledHeader onClick={onClick} pose={loginMethod === "" ? "open" : "closed"}>
    <Logo>Nuber</Logo>
  </StyledHeader>
);

export default Header;
