import React from "react";
import EmailLoginPresenter from "./EmailLoginPresenter";

interface IState {
  email: string;
}

class EmailLoginContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: ""
    };
  }
  render() {
    const { email } = this.state;
    return (
      <EmailLoginPresenter
        email={email}
        handleInputChange={this.handleInputChange}
      />
    );
  }

  private handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default EmailLoginContainer;
