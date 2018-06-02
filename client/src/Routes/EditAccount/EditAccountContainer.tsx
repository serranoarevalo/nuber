import React from "react";
import { graphql } from "react-apollo";
import EditAccountPresenter from "./EditAccountPresenter";
import { ME } from "./EditAccountQueries";

interface IState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

class EditAccountContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    };
  }

  componentWillReceiveProps(newProps) {
    const {
      data: { me }
    } = newProps;
    if (me) {
      const { ok, user } = me;
      if (ok) {
        const { firstName, lastName, phoneNumber, email } = user;
        this.setState({
          firstName,
          lastName,
          phoneNumber,
          email
        });
      }
    }
  }

  render() {
    const { firstName, lastName, phoneNumber, email } = this.state;
    console.log(this.state);
    return (
      <EditAccountPresenter
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
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

export default graphql(ME)(EditAccountContainer);
