import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import bg from "../../images/bg.png";

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  phoneNumber: string;
}

const PresenterScreen = styled.div`
  width: 100%;
  height: 100vh;
  overflow:hidden;
  display:grid;
  grid-template-columns: 100%
  grid-template-rows:78% 15% 7%;
  grid-template-areas:"header"
                      "mobile"
                      "social";
`;

const Header = styled.div`
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bg});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: header;
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

const Mobile = styled.div`
  grid-area: mobile;
  background-color: white;
  display: flex;
  padding: 0 15px;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 28px;
  display: block;
  margin-bottom: 30px;
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

const Social = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  grid-area: social;
  border-top: 1px solid rgba(41, 128, 185, 0.5);
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
  margin: 0 15px;
`;

const LoginPresenter: React.SFC<IProps> = () => (
  <PresenterScreen>
    <Header>
      <Logo>Nuber</Logo>
    </Header>
    <Mobile>
      <Title>Get moving with Nuber</Title>
      <span>
        <PhoneText>🇰🇷 +82</PhoneText>
        <PhoneText grey={true}>Enter your mobile number</PhoneText>
      </span>
    </Mobile>
    <Social>
      <SocialText>Or connect with social</SocialText>
    </Social>
  </PresenterScreen>
);

LoginPresenter.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  handleMobileClick: PropTypes.func.isRequired,
  handleSocialClick: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired
};
export default LoginPresenter;
