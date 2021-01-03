require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "transform-assets",
      {
        extensions: ["css", "svg"],
        name: "static/media/[name].[hash:8].[ext]",
      },
    ],
  ],
});

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("../src/App").default;
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/*", (req, res, next) => {
  console.log(`Request URL = ${req.url}`);
  if (req.url !== "/") {
    return next();
  }
  const reactApp = ReactDOMServer.renderToString(React.createElement(App));
  console.log(reactApp);

  const indexFile = path.resolve("build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
