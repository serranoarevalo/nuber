import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Header from "./Header";
import { loginMethodType } from "./LoginTypes";
import MobileLogin from "./MobileLogin";

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

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
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
  margin: 0 15px;
`;

const PhoneInput = styled<any, any>("input")`
  border: 0;
  width: 70%;
  font-family: "Maven Pro";
  font-size: 20px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: "Maven Pro";
  }
  &:disabled {
    background-color: transparent;
    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  phoneNumber: string;
  loginMethod: loginMethodType;
}

class LoginPresenter extends React.Component<IProps, {}> {
  static propTypes = {
    handleBackButtonClick: PropTypes.func.isRequired,
    handleMobileClick: PropTypes.func.isRequired,
    handleSocialClick: PropTypes.func.isRequired,
    loginMethod: PropTypes.oneOf(["", "mobile", "social"]),
    phoneNumber: PropTypes.string.isRequired
  };
  textInput: any;
  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    const { loginMethod } = this.props;
    return (
      <PresenterScreen>
        <BackButton loginMethod={loginMethod} onClick={this.handleBackClick} />
        <Header onClick={this.handleMobileClick} loginMethod={loginMethod} />
        <MobileLogin onClick={this.handleMobileClick} loginMethod={loginMethod}>
          <PhoneInput
            placeholder="Enter your mobile number"
            innerRef={this.textInput}
            type="text"
          />
        </MobileLogin>
        <Social hidding={loginMethod === "mobile"}>
          <SocialText>Or connect with social</SocialText>
        </Social>
      </PresenterScreen>
    );
  }
  handleMobileClick = (): void => {
    const { handleMobileClick, loginMethod } = this.props;
    if (loginMethod === "") {
      handleMobileClick();
      setTimeout(() => this.textInput.current.focus(), 500);
    }
  };
  handleBackClick = (): void => {
    const { handleBackButtonClick, loginMethod } = this.props;
    if (loginMethod !== "") {
      this.textInput.current.blur();
      setTimeout(() => handleBackButtonClick(), 200);
    }
  };
}

export default LoginPresenter;
