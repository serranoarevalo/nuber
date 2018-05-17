import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import client from "./apollo";
import App from "./Components/App";

injectGlobal`
  ${reset};
  * {
    box-sizing:border-box;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
