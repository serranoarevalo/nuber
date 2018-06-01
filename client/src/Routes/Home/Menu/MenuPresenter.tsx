import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
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
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IProps {
  loading: boolean;
  data: any;
}

const MenuPresenter: React.SFC<IProps> = ({ loading, data }) => (
  <Container>
    <Header>
      {loading ? (
        <Placeholder>
          <FontAwesome name="spinner fa-spin" />
        </Placeholder>
      ) : (
        <Grid>
          <Link to={"/edit-account"}>
            <Image src={data.me.user.profilePhoto} />
          </Link>
          <Text>
            <Name>{data.me.user.fullName}</Name>
            <Rating>4.5</Rating>
          </Text>
        </Grid>
      )}
    </Header>
    <SLink to="/payment">Payment</SLink>
    <SLink to="/trips">Your Trips</SLink>
    <SLink to="/settings">Settings</SLink>
  </Container>
);

export default MenuPresenter;
