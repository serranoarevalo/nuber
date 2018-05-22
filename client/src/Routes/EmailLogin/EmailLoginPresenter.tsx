import React from "react";

const Spring = require("react-spring");

interface IProps {
  email: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({ email }) => (
  <Spring.Transition
    from={{ color: "red" }}
    enter={{ color: "yellow" }}
    leave={{ color: "black" }}
  >
    {styles => (
      <div style={styles}>
        <span>hello</span>
      </div>
    )}
  </Spring.Transition>
);

export default EmailLoginPresenter;
