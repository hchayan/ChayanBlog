import React, { useState, useEffect } from "react";
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
import Manage from "./components/page/manage/Manage";

import { authService } from "./blogFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [articleObj, setArticleObj] = useState(null);
  const [loggedIn, setLoggedIn] = useState(authService.cuurentUser);

  const [articles, setArticles] = useState([]);
  const [bookmarks, setBookMarks] = useState([]);

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
      {init ? (
        <Router>
          <Header
            loggedIn={loggedIn}
            userObj={userObj}
            articles={articles}
            bookmarks={bookmarks}
          />
          <Switch>
            <Route exact path="/">
              <Contents
                articles={articles}
                setArticles={setArticles}
                userObj={userObj}
                loggedIn={loggedIn}
                bookmarks={bookmarks}
                setBookMarks={setBookMarks}
              />
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

            {!loggedIn ? (
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
                <Route excat path="/setting">
                  <Manage userObj={userObj} articles={articles} />
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
