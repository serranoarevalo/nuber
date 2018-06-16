import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { ItemTitle, ItemValue } from "../Shared";

interface IProps {
  photo: string;
  name: string;
  rating?: number;
}

const User = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  align-items: center;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const Column = styled.div``;

const UserCardPresenter: React.SFC<IProps> = ({ photo, name, rating }) => (
  <User>
    <Image src={photo} />
    <Column>
      <ItemValue>{name}</ItemValue>
      {rating && <ItemTitle>{rating}</ItemTitle>}
    </Column>
  </User>
);

UserCardPresenter.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number
};

export default UserCardPresenter;
