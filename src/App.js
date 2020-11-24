import React, { useState } from "react";
import Header from "components/Header";
import Contents from "components/Contents";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Contents />
    </div>
  );
}

export default App;
