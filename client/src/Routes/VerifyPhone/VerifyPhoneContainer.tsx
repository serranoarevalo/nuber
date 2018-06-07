import React from "react";
import { Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import { ME } from "../../sharedQueries";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { CONFIRM_PHONE, VERIFY_KEY } from "./VerifyPhoneQueries";

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
    const { mutation } = this.props;
    return (
      <Mutation
        mutation={
          mutation === "completePhoneSignIn" ? VERIFY_KEY : CONFIRM_PHONE
        }
        update={this.handlePostSubmit}
        variables={{ phone, key: verificationKey }}
      >
        {(completePhoneSignIn, { loading }) => (
          <VerifyPhonePresenter
            verificationKey={verificationKey}
            handleInputChange={this.handleInputChange}
            loading={loading}
            onSubmit={completePhoneSignIn}
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
    const { completePhoneSignIn, verifyPhone } = data;
    const { history } = this.props;
    const { phone } = this.state;
    if (completePhoneSignIn) {
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
    } else if (verifyPhone) {
      if (verifyPhone.error && !verifyPhone.ok) {
        toast.error(verifyPhone.error);
      } else if (verifyPhone.ok) {
        toast.success("Phone number verified");
        cache.readQuery({ query: ME });
        console.log(cache);
      }
    }
  };
}

export default VerifyPhoneContainer;
