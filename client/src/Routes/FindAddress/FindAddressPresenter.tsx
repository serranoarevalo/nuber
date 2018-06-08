import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import Button from "../../Components/Button";
import Form from "../../Components/Form";

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

const AddressBar = styled.input`
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: white;
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 2;
  width: 100%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
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
          <Form width={"80%"} onSubmit={geoCode}>
            <AddressBar
              name={"address"}
              value={address}
              onChange={handleInputChange}
            />
          </Form>
        </AbsContainer>
        <Marker>
          <FontAwesome name={"map-marker"} />
        </Marker>
        <AbsContainer top={false}>
          <Button
            onClick={pickAddress}
            text="Pick place"
            disabled={false}
            width="80%"
          />
        </AbsContainer>
        <Map innerRef={mapRef} />
      </Container>
    );
  }
}

export default FindAddressPresenter;
