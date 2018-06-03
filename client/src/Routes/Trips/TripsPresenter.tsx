import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const TripsPresenter: React.SFC = () => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Your Trips"} />
    <Container />
  </Wrapper>
);

export default TripsPresenter;
