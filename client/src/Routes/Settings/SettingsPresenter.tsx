import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";

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

const SLink = styled(Link)`
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

const UnderlineLink = styled(Link)`
  text-decoration: underline;
`;

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
          <SLink to={"/edit-account"}>
            <Image src={data.me.user.profilePhoto} />
            <Keys>
              <Key>{data.me.user.fullName}</Key>
              <Key>{data.me.user.phoneNumber}</Key>
              <Key>{data.me.user.email}</Key>
            </Keys>
          </SLink>
        </Item>
        <Item>
          <ItemTitle>Favorites</ItemTitle>
          {!data.me.user.places && (
            <NoPlaces>
              You have no favorite places yet.{" "}
              <UnderlineLink to={"/places"}>Add one</UnderlineLink>
            </NoPlaces>
          )}
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
