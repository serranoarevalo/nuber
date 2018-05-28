import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled<any, any>("div")`
  background-color: black;
  width: 100%;
  height: ${props => {
    if (props.scrollHeight < 8) {
      return `${13 - props.scrollHeight}vh;`;
    } else {
      return "5vh;";
    }
  }};
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: ${props => (props.scrollHeight < 10 ? "column" : "row")};
  justify-content: ${props =>
    props.scrollHeight < 5 ? "space-between" : "flex-start"};
  position: fixed;
  width: 100%;
  transition: height 0.1s linear;
  box-shadow: ${props =>
      props.scrollHeight > 5
        ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);"
        : "none;"}
    span {
    color: white;
    font-size: 18px;
  }
`;

const Title = styled<any, any>("h2")`
  font-size: 30px;
  transition: transform 0.1s linear;
  transform-origin: 0%;
  transform: ${props =>
    props.scrollHeight < 15
      ? `translateX(${props.scrollHeight * 2.5}px)  scale(.7)`
      : `translateX(35px)  scale(.7)`};
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

export default HeaderPresenter;
