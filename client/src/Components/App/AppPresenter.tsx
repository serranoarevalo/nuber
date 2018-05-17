import React from "react";

interface IAppPresenterProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IAppPresenterProps> = ({ isLoggedIn }) => (
  <span>{JSON.stringify(isLoggedIn)}</span>
);

export default AppPresenter;
