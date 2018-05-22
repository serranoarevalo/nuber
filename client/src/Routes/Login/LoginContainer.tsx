import React from "react";
import { graphql, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
import LoginPresenter from "./LoginPresenter";
import { FACEBOOK_CONNECT, LOG_USER_IN } from "./LoginQueries";
import { loginMethodType } from "./LoginTypes";

interface IState {
  phoneNumber: string;
  countryCode: string;
  loginMethod: loginMethodType;
}

interface IProps {
  facebookConnectMutation: MutationFn;
}

class LoginContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryCode: "+82",
      loginMethod: "",
      phoneNumber: ""
    };
  }
  render() {
    const { phoneNumber, loginMethod, countryCode } = this.state;
    return (
      <LoginPresenter
        handleMobileClick={this.handleMobileClick}
        handleSocialClick={this.handleSocialClick}
        handleBackButtonClick={this.handleBackButtonClick}
        phoneNumber={phoneNumber}
        loginMethod={loginMethod}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        countryCode={countryCode}
        handleFacebookResponse={this.handleFacebookResponse}
      />
    );
  }
  private handleMobileClick = (): void => {
    this.setState({
      loginMethod: "mobile"
    });
  };
  private handleSocialClick = (): void => {
    this.setState({
      loginMethod: "social"
    });
  };

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

  private handleBackButtonClick = (): void => {
    this.setState({
      loginMethod: ""
    });
  };

  private handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    const { phoneNumber, countryCode } = this.state;
    event.preventDefault();
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCode}${phoneNumber}`
    );
    if (isValid) {
      return;
    } else {
      toast.error("Phone number is not valid");
    }
  };
  private handleFacebookResponse = async (response: any): Promise<void> => {
    const { facebookConnectMutation } = this.props;
    if (response.accessToken) {
      facebookConnectMutation({
        variables: {
          email: response.email ? response.email : null,
          firstName: response.first_name,
          lastName: response.last_name,
          userID: response.userID
        },
        update: (proxy, { data: { facebookConnect } }) => {
          if (facebookConnect.ok) {
            proxy.writeQuery({
              data: {
                token: facebookConnect.token
              },
              query: LOG_USER_IN
            });
          }
        }
      });
    }
  };
}

export default graphql<any, any>(FACEBOOK_CONNECT, {
  name: "facebookConnectMutation"
})(LoginContainer);
