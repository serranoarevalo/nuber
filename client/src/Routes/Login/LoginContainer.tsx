import React from "react";
import LoginPresenter from "./LoginPresenter";
import { loginMethodType } from "./LoginTypes";

interface IState {
  phoneNumber: string;
  countryCode: string;
  loginMethod: loginMethodType;
}

class LoginContainer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      countryCode: "+82",
      loginMethod: "",
      phoneNumber: ""
    };
  }
  render() {
    const { phoneNumber, loginMethod, countryCode } = this.state;
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
        handleBackButtonClick={this.handleBackButtonClick}
        phoneNumber={phoneNumber}
        loginMethod={loginMethod}
        handleInputChange={this.handleInputChange}
        countryCode={countryCode}
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
  private handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default LoginContainer;
