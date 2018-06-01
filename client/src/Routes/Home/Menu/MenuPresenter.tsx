import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
`;

const SLink = styled(Link)`
  font-size: 26px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const MenuPresenter: React.SFC = () => (
  <Container>
    <Header />
    <SLink to="/">Payment</SLink>
    <SLink to="/">Your Trips</SLink>
    <SLink to="/">Settings</SLink>
  </Container>
);

export default MenuPresenter;
