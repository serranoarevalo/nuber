import { tween } from "popmotion";
import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import posed from "react-pose";
import { PoseElementProps } from "react-pose/lib/components/PoseElement.types";
import styled from "styled-components";
import bg from "../../images/bg.png";
import { loginMethodType } from "./LoginTypes";

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const PosedHeader = posed.div({
  closed: {
    maxHeight: "50px",
    opacity: 0,
    transition: (props: any) => tween({ ...props, duration: 300 })
  },
  open: {
    maxHeight: "1000px",
    opacity: 1,
    transition: (props: any) => tween({ ...props, duration: 300 })
  }
});

interface IStyledHeader {
  pose: PoseElementProps;
  onCLick: () => void;
}

const StyledHeader = styled<IStyledHeader, any>(PosedHeader)`
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bg});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78%;
  will-change: maxHeight;
`;

const Logo = styled.span`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

interface IStyledMobile {
  pose: PoseElementProps;
  onCLick: () => void;
  loginMethod: loginMethodType;
}

const StyledMobile = styled<IStyledMobile, any>("div")`
  background-color: white;
  padding: 0px 15px;
  will-change: maxHeight;
  transition: all 0.1s linear;
  display: flex;
  height: 15%;
  flex-direction: column;
  transition: all 10s linear;
  justify-content: ${props =>
    props.loginMethod === "" ? "center" : "flex-start"};
`;

const Title = styled.div`
  font-size: 28px;
  display: block;
  margin-bottom: 20px;
`;

interface IPhoneText {
  grey: string;
}

const PhoneText = styled<IPhoneText, any>("span")`
  font-size: 20px;
  color: ${props => (props.grey ? " rgba(0, 0, 0, 0.5)" : "#2c3e50")};
  &:last-child {
    margin-left: 20px;
  }
`;

const PhoneInput = styled<any, any>("input")`
  border: 0;
  width: 70%;
  font-family: "Maven Pro";
  font-size: 20px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: "Maven Pro";
  }
  &:disabled {
    background-color: transparent;
    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

interface ISocial {
  hidding: boolean;
}

const Social = styled<ISocial, any>("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 7%;
  border-top: 1px solid rgba(41, 128, 185, 0.5);
  transition: opacity 0.3s linear;
  opacity: ${props => (props.hidding ? "0" : "1")};
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
  margin: 0 15px;
`;

interface IStyledBackButton {
  pose: PoseElementProps;
  onCLick: () => void;
}

const PosedBackButton = posed.span({
  hidding: {
    left: "-50px",
    transition: (props: any) => tween({ ...props, duration: 500 })
  },
  showing: {
    left: "15px",
    transition: (props: any) => tween({ ...props, duration: 500 })
  }
});

const StyledBackButton = styled<IStyledBackButton, any>(PosedBackButton)`
  position: absolute;
  top: 15px;
  font-size: 30px;
  left: 15px;
  z-index: 9;
  color: rgba(0, 0, 0, 0.7);
`;

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  phoneNumber: string;
  loginMethod: loginMethodType;
}

class LoginPresenter extends React.Component<IProps, {}> {
  static propTypes = {
    handleBackButtonClick: PropTypes.func.isRequired,
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
    const { loginMethod } = this.props;
    return (
      <PresenterScreen>
        <StyledBackButton
          pose={loginMethod !== "" ? "showing" : "hidding"}
          onClick={this.handleBackClick}
        >
          <FontAwesome name="arrow-circle-left" />
        </StyledBackButton>
        <StyledHeader
          onClick={this.handleMobileClick}
          pose={loginMethod === "" ? "open" : "closed"}
        >
          <Logo>Nuber</Logo>
        </StyledHeader>
        <StyledMobile
          onClick={this.handleMobileClick}
          pose={loginMethod === "mobile" ? "open" : "closed"}
          loginMethod={loginMethod}
        >
          <Title>Get moving with Nuber</Title>
          <span>
            <PhoneText>🇰🇷 +82</PhoneText>
            <PhoneInput
              placeholder="Enter your mobile number"
              innerRef={this.textInput}
              type="text"
            />
          </span>
        </StyledMobile>
        <Social hidding={loginMethod === "mobile"}>
          <SocialText>Or connect with social</SocialText>
        </Social>
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
      setTimeout(() => handleBackButtonClick(), 200);
    }
  };
}

export default LoginPresenter;
