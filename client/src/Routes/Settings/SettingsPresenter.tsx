import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Place from "../../Components/Place";

const Container = styled.div`
  width: 100%;
  padding-top: 150px;
  height: 100%;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const Item = styled<any, any>("div")`
  border-bottom: 1px solid #bdc3c7;
  padding: 0 15px;
  padding-bottom: 15px;
  &:not(:first-child) {
    margin-top: 15px;
  }
`;

const ItemTitle = styled.span`
  color: ${props => props.theme.grey};
`;

const NoPlaces = styled.div`
  margin-top: 20px;
`;

const SLink = styled<any, any>(Link)`
  color: ${props => props.theme.blue};
  margin-top: 30px;
  display: block;
`;

const FakeLink = SLink.withComponent("span");

interface IProps {
  loading: boolean;
  data: any;
  logUserOut: MutationFn;
}

const SettingsPresenter: React.SFC<IProps> = ({
  loading,
  data,
  logUserOut
}) => (
  <Wrapper className={"shouldScroll"}>
    <Helmet>
      <title>Account Settings | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Account Settings"} />
    {loading ? (
      <Placeholder>
        <FontAwesome name="spinner fa-spin" />
      </Placeholder>
    ) : (
      <Container>
        <Item>
          <GridLink to={"/edit-account"}>
            <Image src={data.user.profilePhoto} />
            <Keys>
              <Key>{data.user.fullName}</Key>
              <Key>{data.user.phoneNumber}</Key>
              <Key>{data.user.email}</Key>
            </Keys>
          </GridLink>
        </Item>
        <Item>
          <Link to={"/places"}>
            <ItemTitle>Favorites</ItemTitle>
            {data.places.length < 1 ? (
              <NoPlaces>
                You have no favorite places yet.{" "}
                <SLink to={"/add-place"}>Add one</SLink>
              </NoPlaces>
            ) : (
              <React.Fragment>
                <Place
                  name={data.places[0].name}
                  fav={data.places[0].fav}
                  address={data.places[0].address}
                />
                <FakeLink>More Saved Places</FakeLink>
              </React.Fragment>
            )}
          </Link>
        </Item>
        <Item onClick={logUserOut}>Log Out</Item>
      </Container>
    )}
  </Wrapper>
);

SettingsPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  logUserOut: PropTypes.func.isRequired
};

export default SettingsPresenter;
