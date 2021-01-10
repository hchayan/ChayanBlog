import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  });

  return (
    <div className="App">
      <Helmet
        meta={[
          { name: "description", content: "Description of page" },
          { property: "og:title", content: "차얀 블로그" },
          {
            property: "og:image",
            content:
              "https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e",
          },
          { property: "og:url", content: "https://dev.chayan.io" },
        ]}
      ></Helmet>
      {init ? (
        <Router>
          <Header loggedIn={loggedIn} userObj={userObj} articles={articles} />
          <Switch>
            <Route exact path="/">
              <Contents
                articles={articles}
                setArticles={setArticles}
                userObj={userObj}
                loggedIn={loggedIn}
              />
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

            {!loggedIn ||
            (userObj && userObj.uid !== process.env.REACT_APP_MASTERUID) ? (
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
