import React from "react";
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

interface IProps {
  addPlaceRedirect: () => void;
}

const PlacesPresenter: React.SFC<IProps> = ({ addPlaceRedirect }) => (
  <Wrapper className={"shouldScroll"}>
    <Header backTo="/" title={"Saved Places"} />
    <Container>
      <ActionButton onClick={addPlaceRedirect} icon={"plus"} disabled={false} />
    </Container>
  </Wrapper>
);

export default PlacesPresenter;
