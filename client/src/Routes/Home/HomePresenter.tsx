import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import Menu from "./Menu";

const Container = styled.div`
  height: 100%;
`;

const Icon = styled.button`
  height: 50px;
  width: 50px;
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 26px;
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

interface IPros {
  openMenu: () => void;
  closeMenu: () => void;
  isMenuOpen: boolean;
}

const HomePresenter: React.SFC<IPros> = ({
  openMenu,
  isMenuOpen,
  closeMenu
}) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      open={isMenuOpen}
      sidebar={<Menu />}
      styles={{
        sidebar: {
          width: "80%",
          backgroundColor: "white"
        }
      }}
      onSetOpen={closeMenu}
    >
      <Icon onClick={openMenu}>
        <FontAwesome name={"bars"} />
      </Icon>
    </Sidebar>
  </Container>
);

HomePresenter.propTypes = {
  openMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default HomePresenter;
