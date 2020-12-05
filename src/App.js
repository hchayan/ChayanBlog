import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "components/Header";
import Contents from "components/Contents";

import Auth from "components/page/Auth";
import Write from "components/page/Write";
import Post from "components/page/Post";

import { authService } from "./blogFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
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
      {init ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn} userObj={userObj} />
              <Contents />
            </Route>

            <Route exact path="/404">
              404
            </Route>

            <Route path="/post/:id" component={Post} />

            {!loggedIn ? (
              <Route exact path="/login">
                <Auth />
              </Route>
            ) : (
              <Route exact path="/write">
                <Header loggedIn={loggedIn} userObj={userObj} />
                <Write userObj={userObj} />
              </Route>
            )}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      ) : (
        <div className="Loading">페이지 로딩중...</div>
      )}
    </div>
  );
}

export default App;
