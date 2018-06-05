import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ActionButton from "../../Components/ActionButton";
import Header from "../../Components/Header";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const NoPlaces = styled.div``;

const SLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.blue};
`;

interface IProps {
  addPlaceRedirect: () => void;
  places: object[];
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  addPlaceRedirect,
  places,
  loading
}) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Saved Places"} />
    <Container>
      {places.length === 0 && (
        <NoPlaces>
          You have no saved places. <SLink to="/add-place">Add one now</SLink>
        </NoPlaces>
      )}
      <ActionButton onClick={addPlaceRedirect} icon={"plus"} disabled={false} />
    </Container>
  </Wrapper>
);

PlacesPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  addPlaceRedirect: PropTypes.func.isRequired,
  places: PropTypes.array.isRequired
};

export default PlacesPresenter;
