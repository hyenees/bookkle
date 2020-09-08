import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "styles/GlobalStyle";
import Main from "pages/Main";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
