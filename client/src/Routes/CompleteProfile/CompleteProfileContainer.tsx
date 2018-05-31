import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import CompleteProfilePresenter from "./CompleteProfilePresenter";
import { EMAIL_SIGN_UP } from "./CompleteProfileQueries";

interface IState {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: string;
}

class CompleteProfileContainer extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    const {
      location: { state }
    } = props;
    let phoneNumber = "";
    if (state) {
      phoneNumber = state.phone;
    } else {
      phoneNumber = "";
    }
    this.state = {
      phoneNumber,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      age: ""
    };
  }
  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      age,
      phoneNumber
    } = this.state;
    return (
      <Mutation mutation={EMAIL_SIGN_UP} update={this.handlePostSubmit}>
        {(emailSignUp, { loading }) => (
          <CompleteProfilePresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            password={password}
            age={age}
            handleInputChange={this.handleInputChange}
            loading={loading}
            // tslint:disable-next-line jsx-no-lambda
            onSubmit={event => {
              event.preventDefault();
              emailSignUp({
                variables: {
                  phoneNumber,
                  email,
                  firstName,
                  lastName,
                  password,
                  age
                }
              });
            }}
          />
        )}
      </Mutation>
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

  private handlePostSubmit: MutationUpdaterFn = (
    cache,
    { data }: { data: any }
  ) => {
    const { emailSignUp } = data;
    if (!emailSignUp.ok && emailSignUp.error) {
      toast.error(emailSignUp.error);
    } else if (emailSignUp.token) {
      // TO DO : Redirect to /
      localStorage.setItem("jwt", emailSignUp.token);
      cache.writeData({
        data: {
          user: {
            __typename: "User",
            isLoggedIn: true
          }
        }
      });
    }
  };
}
export default CompleteProfileContainer;
