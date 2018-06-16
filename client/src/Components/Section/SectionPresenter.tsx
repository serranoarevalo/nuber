import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Section = styled<any, any>("div")`
  border-bottom: ${props => (props.last ? "none;" : "1px solid #bdc3c7")};
  padding: 30px 15px;
  ${props => props.first && "padding-top:0;"};
  width: 100%;
`;

const Title = styled.span`
  color: ${props => props.theme.grey};
  display: block;
  margin-bottom: 35px;
`;

interface IProps {
  title?: string;
  last?: boolean;
  first?: boolean;
  children: any;
}

const SectionPresenter: React.SFC<IProps> = ({
  title,
  children,
  last = false,
  first = false
}) => (
  <Section first={first} last={last}>
    {title && <Title>{title}</Title>}
    {children}
  </Section>
);

SectionPresenter.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SectionPresenter;
