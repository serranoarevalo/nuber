import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div`
  padding: 0 15px;
  padding-top: 150px;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const AddPhonePresenter: React.SFC = () => (
  <Wrapper>
    <Header backTo="/add-phone" title={"Add your phone"} />
    <Container />
  </Wrapper>
);

export default AddPhonePresenter;
