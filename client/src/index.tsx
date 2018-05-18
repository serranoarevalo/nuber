import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import client from "./apollo";
import App from "./Components/App";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro:400,500');
  ${reset};
  * {
    box-sizing:border-box;
  }
  body {
    font-family: "Maven Pro", sans-serif;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
