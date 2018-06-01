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
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  padding: 0 15px;
  grid-gap: 10px;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.div`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}`;

interface IProps {
  loading: boolean;
  data: any;
}

const MenuPresenter: React.SFC<IProps> = ({ loading, data }) => (
  <Container>
    <Header>
      {!loading && (
        <React.Fragment>
          <Image />
          <Text>
            <Name>Nicolas Serrano Arevalo</Name>
            <Rating>4.5</Rating>
          </Text>
        </React.Fragment>
      )}
    </Header>
    <SLink to="/">Payment</SLink>
    <SLink to="/">Your Trips</SLink>
    <SLink to="/">Settings</SLink>
  </Container>
);

export default MenuPresenter;
