import React from "react";
import VerifyPhoneContainer from "./VerifyPhoneContainer";

interface IState {
  verificationKey: string;
  phone: string | null;
}

class VerifyPhonePresenter extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(props.location.search);
    const phone = query.get("phone");
    this.state = {
      verificationKey: "",
      phone
    };
  }
  render() {
    const { verificationKey, phone } = this.state;
    const { history } = this.props;
    if (phone === null) {
      history.push("/");
    }
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

export default VerifyPhonePresenter;
