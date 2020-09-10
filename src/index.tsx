import React from "react";
import ReactDOM from "react-dom";
import Routes from "Routes";
import { Provider } from "react-redux";
import configureStore from "redux/store/configureStore";

// 스토어를 생성한다
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
