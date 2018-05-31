import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div``;

const CompleteProfilePresenter: React.SFC<{}> = () => (
  <Container>
    <Header backTo={"/"} title={"Complete your profile"} />
  </Container>
);

export default CompleteProfilePresenter;
