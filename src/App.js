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

import { authService } from "./blogFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(authService.cuurentUser);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
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
              <Header loggedIn={loggedIn} />
              <Contents />
            </Route>

            <Route exact path="/404">
              404
            </Route>

            {!loggedIn ? (
              <Route exact path="/login">
                <Auth />
              </Route>
            ) : null}
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
