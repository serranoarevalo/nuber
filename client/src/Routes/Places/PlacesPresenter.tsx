import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ActionButton from "../../Components/ActionButton";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import Section from "../../Components/Section";
import { Container, Wrapper } from "../../Components/Shared";

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
  <Wrapper>
    <Helmet>
      <title>Places | Nuber</title>
    </Helmet>
    <Header backTo="/settings" title={"Saved Places"} />
    <Container>
      {places.length === 0 ? (
        <NoPlaces>
          You have no saved places. <SLink to="/add-place">Add one now</SLink>
        </NoPlaces>
      ) : (
        <React.Fragment>
          <Section first={true} title={"Favorites"}>
            {places
              .filter((place: any) => place.fav === true)
              .map((place: any) => (
                <Place
                  name={place.name}
                  address={place.address}
                  fav={true}
                  key={place.id}
                  id={place.id}
                />
              ))}
          </Section>
          <Section title={"Other Saved Places"}>
            {places
              .filter((place: any) => place.fav === false)
              .map((place: any) => (
                <Place
                  name={place.name}
                  address={place.address}
                  fav={false}
                  key={place.id}
                  id={place.id}
                />
              ))}
          </Section>
        </React.Fragment>
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
