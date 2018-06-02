import React from "react";
import { Query } from "react-apollo";
import EditAccountPresenter from "./EditAccountPresenter";
import { ME } from "./EditAccountQueries";

interface IState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

class EditAccountContainer extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: ""
    };
  }
  render() {
    const { firstName, lastName, phoneNumber, email, password } = this.state;
    return (
      <Query query={ME}>
        {({ loading, error, data }) => (
          <EditAccountPresenter
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={email}
            password={password}
            handleInputChange={this.handleInputChange}
          />
        )}
      </Query>
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

export default EditAccountContainer;
