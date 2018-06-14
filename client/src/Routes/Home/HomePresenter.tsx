import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import AddressInput from "../../Components/AddressInput";
import Button from "../../Components/Button";
import Marker from "../../Components/Marker";
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
  align-items: center;
  flex-direction: column;
`;

const Btn = styled.button`
  -webkit-appearance: none;
  border: 0;
  padding: 10px 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  &:active {
    opacity: 0.9;
  }
`;

const UserElements = ({
  toAddress,
  handleInputChange,
  submitAddress,
  mapChoosing,
  toggleMapChoosing,
  chooseMapAddres,
  requestRide,
  findingDirections,
  price
}) => (
  <React.Fragment>
    <AbsContainer top={true}>
      <AddressInput
        value={toAddress}
        name={"toAddress"}
        onChange={handleInputChange}
        onSubmit={submitAddress}
        placeholder={"Where to?"}
        width={"90%"}
        disabled={mapChoosing}
      />
      <Btn onClick={toggleMapChoosing}>
        {mapChoosing ? "Stop choosing" : "Choose from map"}
      </Btn>
    </AbsContainer>
    <AbsContainer top={false}>
      <Button
        onClick={mapChoosing ? chooseMapAddres : requestRide}
        text={(() => {
          if (mapChoosing) {
            return "Pick this place";
          } else if (!mapChoosing && findingDirections) {
            return "Finding directions";
          } else if (price) {
            return `Request ride for $${price}`;
          } else {
            return "Request ride";
          }
        })()}
        disabled={findingDirections}
        width={"90%"}
      />
    </AbsContainer>
  </React.Fragment>
);

const DriverElements = () => null;

interface IProps {
  openMenu: () => void;
  closeMenu: () => void;
  isMenuOpen: boolean;
  me: any;
  redirectToVerify: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitAddress: () => void;
  mapChoosing: boolean;
  toggleMapChoosing: () => void;
  chooseMapAddres: () => void;
  requestRide: () => void;
  findingDirections: boolean;
  price: number | undefined;
}

class HomePresenter extends React.Component<IProps> {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    me: PropTypes.object,
    redirectToVerify: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    toAddress: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    submitAddress: PropTypes.func.isRequired,
    mapChoosing: PropTypes.bool.isRequired,
    toggleMapChoosing: PropTypes.func.isRequired,
    chooseMapAddres: PropTypes.func.isRequired,
    requestRide: PropTypes.func.isRequired,
    findingDirections: PropTypes.bool.isRequired,
    price: PropTypes.number
  };
  render() {
    const {
      openMenu,
      isMenuOpen,
      closeMenu,
      redirectToVerify,
      me,
      loading,
      mapRef,
      toAddress,
      handleInputChange,
      submitAddress,
      mapChoosing,
      toggleMapChoosing,
      chooseMapAddres,
      requestRide,
      findingDirections,
      price
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
            me.user.verifiedPhoneNumber && (
              <Icon onClick={openMenu}>
                <FontAwesome name={"bars"} />
              </Icon>
            )}
        </Sidebar>
        {!loading &&
          !me.user.verifiedPhoneNumber && (
            <PhoneError onClick={redirectToVerify}>
              You need to verify your phone
              <FakeLink>tap here to do it</FakeLink>
            </PhoneError>
          )}
        {mapChoosing && <Marker />}
        <Map innerRef={mapRef} />
        {!loading && me.user.isDriving ? (
          <DriverElements />
        ) : (
          <UserElements
            toAddress={toAddress}
            handleInputChange={handleInputChange}
            submitAddress={submitAddress}
            mapChoosing={mapChoosing}
            toggleMapChoosing={toggleMapChoosing}
            chooseMapAddres={chooseMapAddres}
            requestRide={requestRide}
            findingDirections={findingDirections}
            price={price}
          />
        )}
      </Container>
    );
  }
}
export default HomePresenter;
