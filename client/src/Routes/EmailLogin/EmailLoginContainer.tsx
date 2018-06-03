import React from "react";
import { graphql, Mutation, MutationFn, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import EmailLoginPresenter from "./EmailLoginPresenter";
import { EMAIL_LOGIN } from "./EmailLoginQueries";

interface IState {
  email: string;
  password: string;
}

interface IProps {
  logUserIn: MutationFn;
}

class EmailLoginContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={EMAIL_LOGIN}
        update={this.handleAfterSubmit}
        variables={{ email, password }}
      >
        {(emailLogin, { loading }) => (
          <EmailLoginPresenter
            email={email}
            password={password}
            handleInputChange={this.handleInputChange}
            loading={loading}
            onSubmit={emailLogin}
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
    const { logUserIn } = this.props;
    if (emailSignIn.ok) {
      logUserIn({ variables: { token: emailSignIn.token } });
    } else {
      toast.error(emailSignIn.error);
    }
  };
}

export default graphql<any, any>(LOG_USER_IN, { name: "logUserIn" })(
  EmailLoginContainer
);
