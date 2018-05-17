import React from "react";
import { Query } from "react-apollo";
import AppPresenter from "./AppPresenter";
import isLoggedIn from "./AppQueries";

const AppContainer = () => (
  <Query query={isLoggedIn}>
    {({ data, loading, error }) => {
      return <AppPresenter isLoggedIn={data.user.isLoggedIn} />;
    }}
  </Query>
);

export default AppContainer;
