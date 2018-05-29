import PropTypes from "prop-types";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
import styled from "styled-components";
import countries from "../../countries";
import BackButton from "./BackButton";
import Header from "./Header";
import { REQUEST_PHONE_SIGNIN } from "./LoginQueries";
import { loginMethodType } from "./LoginTypes";
import MobileLogin from "./MobileLogin";
import SocialLogin from "./SocialLogin";
import SubmitButton from "./SubmitButton";

const findCountry = (code: string): string => {
  const foundCountry = countries.find(country => country.dial_code === code);
  if (foundCountry) {
    return `${foundCountry.flag} ${foundCountry.dial_code}`;
  } else {
    return ``;
  }
};

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const PhoneInput = styled<any, any>("input")`
  border: 0;
  font-family: "Maven Pro";
  font-size: 20px;
  width: 70%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: "Maven Pro";
  }
  &:disabled {
    background-color: transparent;
    &::placeholder {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const PhoneSelect = styled<any, any>("select")`
  font-size: 20px;
  color: "#2c3e50";
  webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

const PhoneText = PhoneSelect.withComponent("span").extend`
  margin-right:20px;
   
`;

const PhoneOption = styled.option``;

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  handleFacebookResponse: (response: any) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (
    mutationFn: MutationFn,
    e?: React.FormEvent<HTMLFormElement>
  ) => void;
  phoneNumber: string;
  loginMethod: loginMethodType;
  countryCode: string;
}

class LoginPresenter extends React.Component<IProps, {}> {
  static propTypes = {
    countryCode: PropTypes.string.isRequired,
    handleBackButtonClick: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleMobileClick: PropTypes.func.isRequired,
    handleSocialClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginMethod: PropTypes.oneOf(["", "mobile", "social"]),
    phoneNumber: PropTypes.string.isRequired,
    handleFacebookResponse: PropTypes.func.isRequired
  };
  textInput: any;
  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    const {
      loginMethod,
      phoneNumber,
      handleInputChange,
      countryCode,
      handleSubmit,
      handleSocialClick,
      handleFacebookResponse
    } = this.props;
    return (
      <PresenterScreen>
        <BackButton
          showing={loginMethod !== ""}
          onClick={this.handleBackClick}
        />
        <Header onClick={this.handleMobileClick} loginMethod={loginMethod} />
        <MobileLogin onClick={this.handleMobileClick} loginMethod={loginMethod}>
          <Mutation
            mutation={REQUEST_PHONE_SIGNIN}
            // tslint:disable-next-line jsx-no-lambda
            onError={error => toast.error(error.message)}
          >
            {(phoneSignIn, { loading, data, error }) => {
              if (data) {
                const { requestPhoneSignIn } = data;
                if (requestPhoneSignIn.ok) {
                  toast.success("SMS Sen't redirecting you...");
                } else if (requestPhoneSignIn.error) {
                  toast.error(requestPhoneSignIn.error);
                }
              }
              return (
                // tslint:disable-next-line jsx-no-lambda
                <form onSubmit={e => handleSubmit(phoneSignIn, e)}>
                  {loginMethod === "" ? (
                    <PhoneText>{findCountry(countryCode)}</PhoneText>
                  ) : (
                    <PhoneSelect
                      onChange={handleInputChange}
                      value={countryCode}
                      name={"countryCode"}
                    >
                      {countries.map((country, index) => (
                        <PhoneOption key={index} value={country.dial_code}>
                          {country.flag} {country.name} ({country.dial_code})
                        </PhoneOption>
                      ))}
                    </PhoneSelect>
                  )}
                  <PhoneInput
                    placeholder="Enter your mobile number"
                    innerRef={this.textInput}
                    type="tel"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    name={"phoneNumber"}
                    disabled={loginMethod === ""}
                  />
                  {loginMethod === "mobile" && (
                    <SubmitButton
                      // tslint:disable-next-line jsx-no-lambda
                      onClick={() => handleSubmit(phoneSignIn)}
                      disabled={loading}
                      loading={loading}
                    />
                  )}
                </form>
              );
            }}
          </Mutation>
        </MobileLogin>
        {loginMethod !== "mobile" && (
          <SocialLogin
            loginMethod={loginMethod}
            onClick={handleSocialClick}
            handleFacebookResponse={handleFacebookResponse}
          />
        )}
      </PresenterScreen>
    );
  }
  handleMobileClick = (): void => {
    const { handleMobileClick, loginMethod } = this.props;
    if (loginMethod === "") {
      handleMobileClick();
      setTimeout(() => this.textInput.current.focus(), 500);
    }
  };
  handleBackClick = (): void => {
    const { handleBackButtonClick, loginMethod } = this.props;
    if (loginMethod !== "") {
      this.textInput.current.blur();
      setTimeout(() => handleBackButtonClick(), 300);
    }
  };
}

export default LoginPresenter;
