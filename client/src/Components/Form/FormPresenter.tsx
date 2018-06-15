import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

interface IProps {
  onSubmit?: any;
  children: any;
  width?: string;
}

const Form = styled<IProps, any>("form")`
  width: ${props => props.width};
`;

const FormPresenter: React.SFC<IProps> = ({
  onSubmit,
  children,
  width = "100%"
}) => (
  <Form
    // tslint:disable-next-line jsx-no-lambda
    onSubmit={event => {
      event.preventDefault();
      onSubmit();
    }}
    width={width}
  >
    {children}
  </Form>
);

FormPresenter.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.string
};

export default FormPresenter;
