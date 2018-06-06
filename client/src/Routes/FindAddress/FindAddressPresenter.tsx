import React from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";

const Map = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: 1;
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
`;

interface IProps {
  mapRef: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  render() {
    const { mapRef } = this.props;
    return (
      <React.Fragment>
        <Marker>
          <FontAwesome name={"map-marker"} />
        </Marker>

        <Map innerRef={mapRef} />
      </React.Fragment>
    );
  }
}

export default FindAddressPresenter;
