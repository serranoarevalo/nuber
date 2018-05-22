import React from "react";
import { toast } from "react-toastify";
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
        handleSubmit={this.handleSubmit}
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

  private handleBackButtonClick = (): void => {
    this.setState({
      loginMethod: ""
    });
  };

  private handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    const { phoneNumber, countryCode } = this.state;
    event.preventDefault();
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCode}${phoneNumber}`
    );
    if (isValid) {
      return;
    } else {
      toast.error("Phone number is not valid");
    }
  };
}

export default LoginContainer;
