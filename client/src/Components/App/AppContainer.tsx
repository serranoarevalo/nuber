import React from "react";
import { graphql, Query } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { ME } from "../../sharedQueries";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const theme = {
  grey: "#7f8c8d",
  blue: "#3498db"
};

interface IProps {
  data: any;
}

const AppContainer: React.SFC<IProps> = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Query query={ME} skip={!data.auth.isLoggedIn}>
        {() => <AppPresenter isLoggedIn={data.auth.isLoggedIn} />}
      </Query>
    </ThemeProvider>
    <ToastContainer position={"bottom-center"} draggable={true} />
  </React.Fragment>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
