import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import AddressInput from "../../Components/AddressInput";
import Button from "../../Components/Button";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Map = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
`;

const Marker = styled.span`
  width: 20px;
  height: 20px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  color: ${props => props.theme.blue};
  font-size: 20px;
`;

const AbsContainer = styled<any, any>("div")`
  position: absolute;
  ${props => (props.top ? "top: 50px;" : "bottom: 50px;")};
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

interface IProps {
  mapRef: any;
  address: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  geoCode: () => void;
  pickAddress: () => void;
}

class FindAddressPresenter extends React.Component<IProps> {
  static propTypes = {
    mapRef: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    geoCode: PropTypes.func.isRequired
  };
  render() {
    const {
      mapRef,
      address,
      handleInputChange,
      geoCode,
      pickAddress
    } = this.props;
    return (
      <Container>
        <AbsContainer top={true}>
          <AddressInput
            onSubmit={geoCode}
            name={"address"}
            value={address}
            onChange={handleInputChange}
            width={"90%"}
          />
        </AbsContainer>
        <Marker>
          <FontAwesome name={"map-marker"} />
        </Marker>
        <AbsContainer top={false}>
          <Button
            onClick={pickAddress}
            text="Pick place"
            disabled={false}
            width="90%"
          />
        </AbsContainer>
        <Map innerRef={mapRef} />
      </Container>
    );
  }
}

export default FindAddressPresenter;
