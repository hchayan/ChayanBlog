import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import config from "./config.js";
import Header from "./components/Header";
import Contents from "./components/Contents";
import Footer from "./components/Footer";

import Auth from "./components/page/auth/Auth";
import Write from "./components/page/write/Write";
import Post from "./components/page/post/Post";

import { authService } from "./blogFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [articleObj, setArticleObj] = useState(null);
  const [loggedIn, setLoggedIn] = useState(authService.cuurentUser);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  });

  return (
    <div className="App">
      <Helmet>
        <html lang="kr" />
        <title>홈 | 차얀 블로그</title>
        <meta name="description" content="Chayan Blog" />
      </Helmet>
      {init ? (
        <Router>
          <Header loggedIn={loggedIn} userObj={userObj} />
          <Switch>
            <Route exact path="/">
              <Contents />
            </Route>
            <Route path="/category">
              <Contents />
            </Route>

            <Route exact path="/404">
              404
            </Route>

            <Route
              path="/post/:id"
              render={routerProps => (
                <Post
                  match={routerProps.match}
                  userObj={userObj}
                  articleObj={articleObj}
                  setArticleObj={setArticleObj}
                />
              )}
            />

            {!loggedIn || (userObj && userObj.uid !== config.masterUID) ? (
              <Route exact path="/login">
                <Auth />
              </Route>
            ) : (
              <>
                <Route exact path="/write">
                  <Write userObj={userObj} articleObj={{}} />
                </Route>
                <Route exact path="/edit">
                  <Write userObj={userObj} articleObj={articleObj} />
                </Route>
              </>
            )}
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      ) : (
        <div className="Loading">페이지 로딩중...</div>
      )}
    </div>
  );
}

export default App;
