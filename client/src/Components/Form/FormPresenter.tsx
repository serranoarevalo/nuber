import PropTypes from "prop-types";
import React from "react";

interface IProps {
  onSubmit: any;
  children: any;
}

const FormPresenter: React.SFC<IProps> = ({ onSubmit, children }) => (
  <form
    // tslint:disable-next-line jsx-no-lambda
    onSubmit={event => {
      event.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);

FormPresenter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FormPresenter;
