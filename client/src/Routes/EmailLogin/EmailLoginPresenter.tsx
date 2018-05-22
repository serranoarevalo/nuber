import React from "react";

interface IProps {
  email: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({ email }) => (
  <div>
    <span>hello</span>
  </div>
);

export default EmailLoginPresenter;
