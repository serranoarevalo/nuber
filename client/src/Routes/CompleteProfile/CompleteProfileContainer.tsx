import React from "react";
import { graphql, Mutation, MutationFn, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import CompleteProfilePresenter from "./CompleteProfilePresenter";
import { EMAIL_SIGN_UP } from "./CompleteProfileQueries";

interface IState {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: string;
  profilePhoto: string;
}

interface IProps {
  logUserIn: MutationFn;
  location: any;
  history: any;
}

class CompleteProfileContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

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
      age: "",
      profilePhoto: ""
    };
  }
  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      age,
      phoneNumber,
      profilePhoto
    } = this.state;
    return (
      <Mutation
        mutation={EMAIL_SIGN_UP}
        update={this.handlePostSubmit}
        variables={{
          phoneNumber,
          email,
          firstName,
          lastName,
          password,
          age,
          profilePhoto
        }}
      >
        {(emailSignUp, { loading }) => (
          <CompleteProfilePresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            password={password}
            age={age}
            handleInputChange={this.handleInputChange}
            loading={loading}
            onSubmit={emailSignUp}
            getProfileImage={this.getProfileImage}
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
    const { logUserIn } = this.props;
    if (!emailSignUp.ok && emailSignUp.error) {
      toast.error(emailSignUp.error);
    } else if (emailSignUp.token) {
      logUserIn({ variables: { token: emailSignUp.token } });
    }
  };

  private getProfileImage = (url: string): void => {
    this.setState({
      profilePhoto: url
    });
  };
}
export default graphql<any, any>(LOG_USER_IN, { name: "logUserIn" })(
  CompleteProfileContainer
);
