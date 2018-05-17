import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "../../Routes/Login";

interface IAppPresenterProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IAppPresenterProps> = ({ isLoggedIn }) => (
  <BrowserRouter>{isLoggedIn ? null : <LoggedInRoutes />}</BrowserRouter>
);

const LoggedInRoutes: React.SFC = () => (
  <React.Fragment>
    <Route exact={true} path="/" component={Login} />
  </React.Fragment>
);

export default AppPresenter;
