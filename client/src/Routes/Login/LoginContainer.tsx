import React from "react";
import LoginPresenter from "./LoginPresenter";
import { loginMethodType } from "./LoginTypes";

interface IState {
  loginMethod: loginMethodType;
  phoneNumber: string;
}

class LoginContainer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loginMethod: "",
      phoneNumber: ""
    };
  }
  render() {
    const { phoneNumber, loginMethod } = this.state;
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
        handleBackButtonClick={this.handleBackButtonClick}
        phoneNumber={phoneNumber}
        loginMethod={loginMethod}
      />
    );
  }
  private handleMobileClick = (): void => {
    this.setState({
      loginMethod: "mobile"
    });
  };
  private handleSocialClick = (): void => {
    this.setState({
      loginMethod: "social"
    });
  };
  private handleBackButtonClick = (): void => {
    this.setState({
      loginMethod: ""
    });
  };
}

export default LoginContainer;
