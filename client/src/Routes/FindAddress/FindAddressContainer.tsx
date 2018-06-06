import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Map = styled.div`
  height: 100vh;
  width: 100vw;
`;

class FindAddressContainer extends React.Component<any, any> {
  mapRef: any;
  map: any;
  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    const { google, loaded } = this.props;
    if (google && loaded) {
      this.loadMap();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { google, loaded } = this.props;
    if (google && loaded) {
      this.loadMap();
    }
  }
  render() {
    return <Map innerRef={this.mapRef} />;
  }
  private loadMap = () => {
    const { google } = this.props;
    const maps = google.maps;
    const node = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      center: { lat: 40.7485722, lng: -74.0068633 },
      zoom: 11,
      mapTypeId: "roadmap"
    };
    this.map = new maps.Map(node, mapConfig);
  };
}

export default FindAddressContainer;
