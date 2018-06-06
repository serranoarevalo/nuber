import React from "react";
import styled from "styled-components";

const Map = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface IProps {
  mapRef: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  render() {
    const { mapRef } = this.props;
    return <Map innerRef={mapRef} />;
  }
}

export default FindAddressPresenter;
