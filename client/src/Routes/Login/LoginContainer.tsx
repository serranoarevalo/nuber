import React from "react";
import LoginPresenter from "./LoginPresenter";
import { loginMethodType } from "./LoginTypes";

interface IState {
  loginMethod: loginMethodType;
  phoneNumber: string;
  typing: boolean;
}

class LoginContainer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loginMethod: "",
      phoneNumber: "",
      typing: false
    };
  }
  render() {
    const { phoneNumber, loginMethod, typing } = this.state;
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
        handleBackButtonClick={this.handleBackButtonClick}
        phoneNumber={phoneNumber}
        loginMethod={loginMethod}
        typing={typing}
      />
    );
  }
  private handleMobileClick = (): void => {
    this.setState({
      loginMethod: "mobile",
      typing: true
    });
  };
  private handleSocialClick = (): void => {
    this.setState({
      loginMethod: "social"
    });
  };
  private handleBackButtonClick = (): void => {
    const { loginMethod } = this.state;
    if (loginMethod !== "mobile") {
      this.setState({
        loginMethod: ""
      });
    } else {
      setTimeout(
        () =>
          this.setState({
            loginMethod: ""
          }),
        700
      );
      this.setState({
        typing: false
      });
    }
  };
}

export default LoginContainer;
