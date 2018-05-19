import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import countries from "../../countries";
import BackButton from "./BackButton";
import Header from "./Header";
import { loginMethodType } from "./LoginTypes";
import MobileLogin from "./MobileLogin";
import SocialLogin from "./SocialLogin";

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const PhoneInput = styled<any, any>("input")`
  border: 0;
  width: 70%;
  font-family: "Maven Pro";
  font-size: 20px;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin-bottom: 20px;
  & option {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

const PhoneText = PhoneSelect.withComponent("span").extend`
  margin-right:20px;
`;

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    loginMethod: PropTypes.oneOf(["", "mobile", "social"]),
    phoneNumber: PropTypes.string.isRequired
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
      countryCode
    } = this.props;
    return (
      <PresenterScreen>
        <BackButton loginMethod={loginMethod} onClick={this.handleBackClick} />
        <Header onClick={this.handleMobileClick} loginMethod={loginMethod} />
        <MobileLogin onClick={this.handleMobileClick} loginMethod={loginMethod}>
          {loginMethod === "" ? (
            <PhoneText>🇰🇷 +82</PhoneText>
          ) : (
            <PhoneSelect
              onChange={handleInputChange}
              value={countryCode}
              name={"countryCode"}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.dial_code}>
                  {country.flag} {country.name} ({country.dial_code})
                </option>
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
        </MobileLogin>
        <SocialLogin loginMethod={loginMethod} />
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
