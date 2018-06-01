import PropTypes from "prop-types";
import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled<any, any>("div")`
  background-color: black;
  width: 100%;
  height: ${props => (props.scrollHeight < 3 ? "110px;" : "50px;")};
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  transition: height 0.1s linear;
  box-shadow: ${props =>
    props.scrollHeight < 5
      ? "none;"
      : "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);"};
  span {
    color: white;
    font-size: 18px;
  }
`;

const Title = styled<any, any>("h2")`
  font-size: 30px;
  transform-origin: 0% 0%;
  transition: transform 0.1s linear;
  transform: ${props => {
    if (props.scrollHeight < 3) {
      return "none;";
    } else {
      return "translate(50px, -20px) scale(.7);";
    }
  }};
`;

interface IProps {
  scrollHeight: number;
  title: string;
  backTo: string;
}

const HeaderPresenter: React.SFC<IProps> = ({
  scrollHeight,
  title,
  backTo
}) => (
  <Container scrollHeight={scrollHeight}>
    <Link to={backTo}>
      <FontAwesome name="arrow-left" />
    </Link>
    <Title scrollHeight={scrollHeight}>{title}</Title>
  </Container>
);

HeaderPresenter.propTypes = {
  scrollHeight: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string.isRequired
};

export default HeaderPresenter;
