import PropTypes from "prop-types";
import React from "react";
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

const Address = styled.span`
  color: ${props => props.theme.grey};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
}

const PlacePresenter: React.SFC<IProps> = ({ fav, name, address }) => (
  <Place>
    <i className={fav ? "fas fa-star" : "far fa-star"} />
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

PlacePresenter.propTypes = {
  fav: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

export default PlacePresenter;
