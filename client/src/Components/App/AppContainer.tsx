import React from "react";
import { Query } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppPresenter from "./AppPresenter";
import isLoggedIn from "./AppQueries";

const AppContainer: React.SFC = () => (
  <React.Fragment>
    <Query query={isLoggedIn}>
      {({ data, loading, error }) => {
        return <AppPresenter isLoggedIn={data.user.isLoggedIn} />;
      }}
    </Query>
    <ToastContainer position={"bottom-center"} draggable={true} />
  </React.Fragment>
);

export default AppContainer;
