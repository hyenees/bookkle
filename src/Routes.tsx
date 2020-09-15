import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import Main from "pages/Main";
import BookList from "pages/BookList";
import MyPage from "pages/MyPage";
import Posting from "pages/Posting";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/booklist/:search" component={BookList} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/posting" component={Posting} />
        <Route exact path="/posting/:id" component={Posting} />
      </Switch>
    </Router>
  );
};

export default Routes;
