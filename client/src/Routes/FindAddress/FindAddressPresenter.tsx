import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Map = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface IProps {
  lat: number;
  lng: number;
  google: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  mapRef: any;
  map: any;
  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    this.loadMap();
  }
  componentWillReceiveProps(nextProps: IProps) {
    const { lat, lng } = nextProps;
    if (lat || lng) {
      this.map.setCenter({ lat, lng });
    }
  }
  render() {
    return <Map innerRef={this.mapRef} />;
  }
  private loadMap = () => {
    const { google, lat, lng } = this.props;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat, lng },
      zoom: 11,
      mapTypeId: "roadmap",
      disableDefaultUI: true
    };
    this.map = new maps.Map(node, mapConfig);
  };
}

export default FindAddressPresenter;
