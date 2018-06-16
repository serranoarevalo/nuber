import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { DataRow, ItemValue, Wrapper } from "../../Components/Shared";
import UserCard from "../../Components/UserCard";

const Container = styled.div`
  padding: 15px;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  padding: 15px;
  font-size: 28px;
`;

interface IProps {
  loading: boolean;
  data: any;
}

const RidePresenter: React.SFC<IProps> = ({
  loading,
  data: { getRide: { isDriver = false, ride = null } = {} } = {}
}) => (
  <Wrapper>
    <Helmet>
      <title>Ride | Nuber</title>
    </Helmet>
    <Header>Ride</Header>
    {!loading &&
      ride && (
        <Container>
          <DataRow>
            <ItemValue>{isDriver ? "Your passenger" : "Your driver"}</ItemValue>
          </DataRow>
          {isDriver ? (
            <UserCard
              name={ride.driver.fullName}
              photo={ride.driver.profilePhoto}
            />
          ) : (
            <UserCard
              name={ride.passenger.fullName}
              photo={ride.passenger.profilePhoto}
            />
          )}
        </Container>
      )}
  </Wrapper>
);

export default RidePresenter;
