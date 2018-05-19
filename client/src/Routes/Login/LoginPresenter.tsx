import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BackButton from "./BackButton";
import Header from "./Header";
import { loginMethodType } from "./LoginTypes";
import MobileLogin from "./MobileLogin";
import SocialLogin from "./SocialLogin";

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
        <SocialLogin loginMethod={loginMethod} />
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
