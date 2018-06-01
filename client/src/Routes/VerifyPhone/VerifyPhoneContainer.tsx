import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_KEY } from "./VerifyPhoneQueries";

interface IState {
  verificationKey: string;
  phone: string;
}

class VerifyPhoneContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    const {
      location: { state }
    } = props;
    let phone = "";
    if (state) {
      phone = state.phone;
    } else {
      phone = "";
    }
    this.state = {
      phone,
      verificationKey: ""
    };
  }
  render() {
    const { verificationKey, phone } = this.state;
    return (
      <Mutation mutation={VERIFY_KEY} update={this.handlePostSubmit}>
        {(completePhoneSignIn, { loading }) => (
          <VerifyPhonePresenter
            verificationKey={verificationKey}
            handleInputChange={this.handleInputChange}
            loading={loading}
            // tslint:disable-next-line jsx-no-lambda
            onSubmit={event => {
              event.preventDefault();
              completePhoneSignIn({
                variables: {
                  phone,
                  key: verificationKey
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
  private handlePostSubmit: MutationUpdaterFn = (
    cache,
    { data }: { data: any }
  ) => {
    const { completePhoneSignIn } = data;
    const { history } = this.props;
    const { phone } = this.state;
    if (completePhoneSignIn.error && !completePhoneSignIn.ok) {
      toast.error(completePhoneSignIn.error);
    } else if (completePhoneSignIn.ok && !completePhoneSignIn.error) {
      if (completePhoneSignIn.token) {
        localStorage.setItem("jwt", completePhoneSignIn.token);
        cache.writeData({
          data: {
            user: {
              __typename: "User",
              isLoggedIn: true
            }
          }
        });
      } else {
        toast.success("Phone number verified!");
        setTimeout(() => {
          history.push({
            pathname: "/complete-profile",
            state: {
              phone
            }
          });
        }, 4000);
      }
    }
  };
}

export default VerifyPhoneContainer;
