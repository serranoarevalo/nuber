import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import Section from "../../Components/Section";
import { Container, Wrapper } from "../../Components/Shared";

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
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

const Item = styled<any, any>("div")``;

const NoPlaces = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const SLink = styled<any, any>(Link)`
  color: ${props => props.theme.blue};
  margin-top: 30px;
  display: block;
  width: 100%;
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
        <Section first={true}>
          <GridLink to={"/edit-account"}>
            <Image src={data.user.profilePhoto} />
            <Keys>
              <Key>{data.user.fullName}</Key>
              <Key>{data.user.phoneNumber}</Key>
              <Key>{data.user.email}</Key>
            </Keys>
          </GridLink>
        </Section>

        <Link to={"/places"}>
          <Section title="Favorites">
            {data.places.length === 0 || !data.places ? (
              <NoPlaces>
                You have no favorite places yet.{" "}
                <FakeLink to={"/add-place"}>Add one</FakeLink>
              </NoPlaces>
            ) : (
              <React.Fragment>
                <Place
                  name={data.places[0].name}
                  fav={data.places[0].fav}
                  address={data.places[0].address}
                  id={data.places[0].id}
                />
                <FakeLink>More Saved Places</FakeLink>
              </React.Fragment>
            )}
          </Section>
        </Link>
        <Section last={true}>
          <Item onClick={logUserOut}>Log Out</Item>
        </Section>
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
