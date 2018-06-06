import React from "react";

interface IProps {
  mapRef: React.Ref<HTMLDivElement>;
}

class FindAddressPresenter extends React.Component<IProps> {
  render() {
    const { mapRef } = this.props;
    return <div ref={mapRef} />;
  }
}

export default FindAddressPresenter;
