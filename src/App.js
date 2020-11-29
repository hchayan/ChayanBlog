import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "components/Header";
import Contents from "components/Contents";

import Login from "components/page/Auth";

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
          <Route exact path="/">
            <Header loggedIn={loggedIn} />
            <Contents />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            register
          </Route>
          <Route exact path="/404">
            404
          </Route>
        </Router>
      ) : (
        <div className="Loading">페이지 로딩중...</div>
      )}
    </div>
  );
}

export default App;
