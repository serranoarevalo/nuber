import PropTypes from "prop-types";
import React from "react";
import { MutationFn } from "react-apollo";
import styled from "styled-components";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span``;

const Address = styled.span`
  color: ${props => props.theme.grey};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  editPlace: MutationFn;
  loading: boolean;
}

const PlacePresenter: React.SFC<IProps> = ({
  fav,
  name,
  address,
  editPlace,
  loading
}) => (
  <Place>
    <Icon onClick={editPlace as any}>
      <i className={fav ? "fas fa-star" : "far fa-star"} />
    </Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

PlacePresenter.propTypes = {
  fav: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  editPlace: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default PlacePresenter;
