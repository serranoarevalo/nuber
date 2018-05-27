import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled<any, any>("div")`
  background-color: black;
  width: 100%;
  height: ${props => (props.scrollHeight > 50 ? "5vh" : "13vh")};
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  transition: all 0.3s ease-out;
  box-shadow: ${props =>
      props.scrollHeight > 50
        ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);"
        : "none;"}
    span {
    color: white;
    font-size: 18px;
  }
`;

const Title = styled<any, any>("h2")`
  font-size: 30px;
  position: relative;
  z-index: 9;
  transform: ${props => {
    if (props.scrollHeight > 50) {
      return "translateX(50px) translateY(-25px)";
    } else {
      return "none;";
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

export default HeaderPresenter;
