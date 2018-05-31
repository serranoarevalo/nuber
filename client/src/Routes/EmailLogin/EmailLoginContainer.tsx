import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import EmailLoginPresenter from "./EmailLoginPresenter";
import { EMAIL_LOGIN } from "./EmailQueries";

interface IState {
  email: string;
  password: string;
}

class EmailLoginContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={EMAIL_LOGIN} update={this.handleAfterSubmit}>
        {(emailLogin, { loading }) => (
          <EmailLoginPresenter
            email={email}
            password={password}
            handleInputChange={this.handleInputChange}
            loading={loading}
            // tslint:disable-next-line jsx-no-lambda
            onSubmit={event => {
              event.preventDefault();
              emailLogin({ variables: { email, password } });
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

  private handleAfterSubmit: MutationUpdaterFn = (
    cache,
    { data }: { data: any }
  ) => {
    const { emailSignIn } = data;
    if (emailSignIn.ok) {
      localStorage.setItem("jwt", emailSignIn.token);
      cache.writeData({
        data: {
          user: {
            __typename: "User",
            isLoggedIn: true
          }
        }
      });
    } else {
      toast.error(emailSignIn.error);
    }
  };
}

export default EmailLoginContainer;
