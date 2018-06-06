import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
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
  padding: 10px 5px;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50px;
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
}

class FindAddressPresenter extends React.Component<IProps> {
  render() {
    const { mapRef, address, handleInputChange, geoCode } = this.props;
    return (
      <Container>
        <FormContainer>
          <Form width={"80%"} onSubmit={geoCode}>
            <AddressBar
              name={"address"}
              value={address}
              onChange={handleInputChange}
            />
          </Form>
        </FormContainer>
        <Marker>
          <FontAwesome name={"map-marker"} />
        </Marker>
        <Map innerRef={mapRef} />
      </Container>
    );
  }
}

export default FindAddressPresenter;
