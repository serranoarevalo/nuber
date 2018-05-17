import React from "react";
import LoginPresenter from "./LoginPresenter";

interface IState {
  loginMethod: "" | "phone" | "social";
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
    const { phoneNumber } = this.state;
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
        handleBackButtonClick={this.handleBackButtonClick}
        phoneNumber={phoneNumber}
      />
    );
  }
  private handleMobileClick = (): void => {
    this.setState({
      loginMethod: "phone"
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
