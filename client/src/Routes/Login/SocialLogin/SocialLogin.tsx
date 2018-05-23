import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loginMethodType } from "../LoginTypes";

const Social = styled<any, any>("div")`
  display: flex;
  justify-content: ${props =>
    props.loginMethod !== "social" ? "center" : "flex-start"};
  flex-direction: column;
  height: 7%;
  border-top: ${props =>
    props.loginMethod !== "social"
      ? "1px solid rgba(41, 128, 185, 0.5);"
      : "none"}
  transition: opacity 0.3s linear;
  opacity: ${props => (props.loginMethod === "mobile" ? "0" : "1")};
  padding: 0 15px;
  cursor:pointer;
  will-change: justify-content, border-top;
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
`;

const SocialTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 40px;
`;

const LoginProvider = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 30px;
  padding: 10px 0;
  & i.fa-facebook-square {
    color: #415994;
  }
  & i {
    margin-right: 10px;
  }
`;

interface IProps {
  loginMethod: loginMethodType;
  onClick: () => void;
  handleFacebookResponse: (response: any) => void;
}

interface IFBProps {
  onClick: () => void;
  loginMethod: loginMethodType;
}

const FacebookLoginComponent: React.SFC<IFBProps> = ({
  onClick,
  loginMethod
}) => {
  if (loginMethod === "social") {
    return (
      <LoginProvider onClick={onClick}>
        <i className="fab fa-facebook-square" />
        Facebook
      </LoginProvider>
    );
  } else {
    return null;
  }
};

const SocialLogin: React.SFC<IProps> = ({
  loginMethod,
  onClick,
  handleFacebookResponse
}) => (
  <Social loginMethod={loginMethod} onClick={onClick}>
    {loginMethod === "" && (
      <SocialText>Or connect with Facebook / Email</SocialText>
    )}
    <React.Fragment>
      {loginMethod === "social" && <SocialTitle>Choose an account</SocialTitle>}
      <FacebookLogin
        appId="1718196768212364"
        autoLoad={false}
        fields="first_name,last_name,name,email,picture"
        callback={handleFacebookResponse}
        // tslint:disable-next-line jsx-no-lambda
        render={props => (
          <FacebookLoginComponent onClick={props} loginMethod={loginMethod} />
        )}
      />
      {loginMethod === "social" && (
        <Link to="/email-login">
          <LoginProvider>
            <i className="far fa-envelope" />
            Email
          </LoginProvider>
        </Link>
      )}
    </React.Fragment>
  </Social>
);

export default SocialLogin;
