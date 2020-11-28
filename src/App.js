import React, { useState } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "components/Header";
import Contents from "components/Contents";

import { authService } from "./blogFirebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header loggedIn={loggedIn} />
        <Route exact path="/">
          <Contents />
        </Route>
        <Route exact path="/login">
          login
        </Route>
        <Route exact path="/register">
          register
        </Route>
        <Route exact path="/404">
          404
        </Route>
      </Router>
    </div>
  );
}

export default App;
