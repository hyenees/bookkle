import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "pages/Main";
import BookList from "pages/BookList";
import MyPage from "pages/MyPage";
import Post from "pages/Post";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/booklist" component={BookList} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/post" component={Post} />
      </Switch>
    </Router>
  );
};

export default Routes;
