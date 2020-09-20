import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import Main from "pages/Main/Main";
import BookList from "pages/BookList";
import User from "pages/User";
import Posting from "pages/Posting";
import FollowReviews from "pages/FollowReviews";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/booklist/:search" component={BookList} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/posting/:bookId" component={Posting} />
        <Route exact path="/posting/:id" component={Posting} />
        <Route exact path="/following" component={FollowReviews} />
      </Switch>
    </Router>
  );
};

export default Routes;
