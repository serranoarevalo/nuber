import React from "react";
import LoginPresenter from "./LoginPresenter";

interface IState {
  loginMethod: "" | "phone" | "social";
}

class LoginContainer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loginMethod: ""
    };
  }
  render() {
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
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
}

export default LoginContainer;
