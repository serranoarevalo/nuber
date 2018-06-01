import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import VerifyEmailPresenter from "./VerifyEmailPresenter";
import { VERIFY_EMAIL } from "./VerifyEmailQueries";

class VerifyEmailContainer extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {
      match: { params }
    } = this.props;
    return (
      <Mutation mutation={VERIFY_EMAIL} update={this.postVerify}>
        {(verifyEmail, { loading }) => {
          return (
            <VerifyEmailPresenter
              loading={loading}
              // tslint:disable-next-line jsx-no-lambda
              verifyEmail={() =>
                verifyEmail({ variables: { key: params.key } })
              }
            />
          );
        }}
      </Mutation>
    );
  }

  private postVerify: MutationUpdaterFn = (cache, { data }: { data: any }) => {
    const { verifyEmail } = data;
    const { history } = this.props;
    if (!verifyEmail.ok && verifyEmail.error) {
      toast.error(verifyEmail.error);
    } else if (verifyEmail.ok) {
      toast.success("Email verified! Redirecting...");
      setTimeout(() => history.push("/"), 4000);
    }
  };
}

export default VerifyEmailContainer;
