import React from "react";
import { MutationFn } from "react-apollo";
import FontAwesome from "react-fontawesome";
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
        <Item onClick={logUserOut}>Log Out</Item>
      </Container>
    )}
  </Wrapper>
);

export default SettingsPresenter;
