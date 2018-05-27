import { tween } from "popmotion";
import React from "react";
import FontAwesome from "react-fontawesome";
import posed from "react-pose";
import styled from "styled-components";

const PosedBackButton = posed.span({
  hidding: {
    left: "-50px",
    transition: (props: any) => tween({ ...props, duration: 500 })
  },
  showing: {
    left: "15px",
    transition: (props: any) => tween({ ...props, duration: 500 })
  }
});

const StyledBackButton = styled<any, any>(PosedBackButton)`
  position: absolute;
  top: 15px;
  font-size: 25px;
  left: 15px;
  z-index: 9;
  color: rgba(0, 0, 0, 0.7);
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

interface IProps {
  showing: boolean;
  onClick: () => void;
}

const BackButton: React.SFC<IProps> = ({ showing, onClick }) => (
  <StyledBackButton pose={showing ? "showing" : "hidding"} onClick={onClick}>
    <FontAwesome name="arrow-left" />
  </StyledBackButton>
);

export default BackButton;
