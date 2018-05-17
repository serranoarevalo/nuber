import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  phoneNumber: string;
}

const PresenterScreen = styled.div`
  width: 100%;
  height: 80vh;
  background-color: red;
`;

const LoginPresenter: React.SFC<IProps> = () => (
  <PresenterScreen>
    <h1>sup</h1>
  </PresenterScreen>
);

LoginPresenter.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  handleMobileClick: PropTypes.func.isRequired,
  handleSocialClick: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired
};
export default LoginPresenter;
