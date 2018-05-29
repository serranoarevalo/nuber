import React from "react";
import VerifyPhoneContainer from "./VerifyPhoneContainer";

interface IState {
  verificationKey: string;
}

class VerifyContainer extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      verificationKey: ""
    };
  }
  render() {
    const { verificationKey } = this.state;
    return (
      <VerifyPhoneContainer
        verificationKey={verificationKey}
        handleInputChange={this.handleInputChange}
      />
    );
  }
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

export default VerifyContainer;
