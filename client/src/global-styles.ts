import { injectGlobal } from "styled-components";
import reset from "styled-reset";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro:400,500');
  ${reset};
  * {
    box-sizing:border-box;
  }
  html,body, #root{
    height:100%;
    width:100%;
  }
  body {
    position:fixed;
    overflow:hidden;
    height:100%;
    font-family: "Maven Pro", sans-serif;
  }
  input, 
  button{
    font-family: "Maven Pro", sans-serif;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
