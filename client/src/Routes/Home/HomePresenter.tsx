import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import AddressInput from "../../Components/AddressInput";
import Menu from "./Menu";

const Container = styled.div`
  height: 100%;
`;

const Icon = styled.button`
  height: 50px;
  width: 50px;
  position: absolute;
  top: 15px;
  left: 8px;
  font-size: 26px;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const PhoneError = styled.div`
  background-color: #e74c3c;
  width: 100%;
  color: white;
  padding: 30px 15px;
  position: absolute;
  cursor: pointer;
  bottom: 0;
`;

const FakeLink = styled.span`
  text-decoration: underline;
`;

const Map = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;

const AbsContainer = styled<any, any>("div")`
  position: absolute;
  ${props => (props.top ? "top: 80px;" : "bottom: 50px;")};
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

interface IProps {
  openMenu: () => void;
  closeMenu: () => void;
  isMenuOpen: boolean;
  data: any;
  redirectToVerify: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  geoCode: () => void;
}

class HomePresenter extends React.Component<IProps> {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    redirectToVerify: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  };
  render() {
    const {
      openMenu,
      isMenuOpen,
      closeMenu,
      redirectToVerify,
      data,
      loading,
      mapRef,
      toAddress,
      handleInputChange,
      geoCode
    } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Home | Nuber</title>
        </Helmet>
        <Sidebar
          open={isMenuOpen}
          sidebar={<Menu />}
          styles={{
            sidebar: {
              width: "80%",
              backgroundColor: "white",
              zIndex: "10"
            }
          }}
          onSetOpen={closeMenu}
        >
          {!loading &&
            data.me.user.verifiedPhoneNumber && (
              <Icon onClick={openMenu}>
                <FontAwesome name={"bars"} />
              </Icon>
            )}
        </Sidebar>
        {!loading &&
          !data.me.user.verifiedPhoneNumber && (
            <PhoneError onClick={redirectToVerify}>
              You need to verify your phone
              <FakeLink>tap here to do it</FakeLink>
            </PhoneError>
          )}
        <AbsContainer top={true}>
          <AddressInput
            value={toAddress}
            name={"toAddress"}
            onChange={handleInputChange}
            onSubmit={geoCode}
            placeholder={"Where to?"}
            width={"90%"}
          />
        </AbsContainer>
        <Map innerRef={mapRef} />
      </Container>
    );
  }
}

export default HomePresenter;
