import React from "react";
import { Query } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import AppPresenter from "./AppPresenter";
import { isLoggedIn } from "./AppQueries";

const theme = {
  grey: "#7f8c8d",
  blue: "#3498db"
};

const AppContainer: React.SFC = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Query query={isLoggedIn}>
        {({ data, loading, error }) => {
          return <AppPresenter isLoggedIn={data.user.isLoggedIn} />;
        }}
      </Query>
    </ThemeProvider>
    <ToastContainer position={"bottom-center"} draggable={true} />
  </React.Fragment>
);

export default AppContainer;
