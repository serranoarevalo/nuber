import { tween } from "popmotion";
import PropTypes from "prop-types";
import React from "react";
import posed from "react-pose";
import styled from "styled-components";
import { loginMethodType } from "../LoginTypes";

const PosedMobile = posed.div({
  closed: {
    maxHeight: "0px",
    opacity: 0,
    transition: (props: any) => tween({ ...props, duration: 300 })
  },
  open: {
    maxHeight: "1000px",
    opacity: 1,
    transition: (props: any) => tween({ ...props, duration: 300 })
  }
});

interface IStyledMobileProps {
  onClick: () => void;
  loginMethod: string;
  pose: string;
}

const StyledMobile = styled<IStyledMobileProps>(({ loginMethod, ...rest }) => (
  <PosedMobile {...rest} />
))`
  background-color: white;
  padding: 0px 15px;
  display: flex;
  height: ${props => (props.loginMethod === "" ? "15%" : "80%")}
  flex-direction: column;
  overflow: hidden;
  justify-content: ${props =>
    props.loginMethod === "" ? "center" : "flex-start"};
  will-change: max-height, opacity;
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
    loginMethod={loginMethod}
    pose={loginMethod === "social" ? "closed" : "open"}
  >
    <Title>Get moving with Nuber</Title>
    <span>{children}</span>
  </StyledMobile>
);

MobileLogin.propTypes = {
  onClick: PropTypes.func.isRequired,
  loginMethod: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default MobileLogin;
