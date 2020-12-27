import React, { useState } from "react";
import { Route } from "react-router-dom";
import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [postCount, setPostCount] = useState(0);
  const [orderBy, setOrderBy] = useState(true);

  return (
    <div className="preview">
      <PreviewMenu setSelectedCategory={setSelectedCategory} />
      <PreviewInfo
        postCount={postCount}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <Route path={["/", "/category"]}>
        <PreviewArticles
          selectedCategory={selectedCategory}
          setPostCount={setPostCount}
          orderBy={orderBy}
        />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => (
          <PreviewArticles
            match={routerProps.match}
            selectedCategory={selectedCategory}
            setPostCount={setPostCount}
            orderBy={orderBy}
          />
        )}
      />
    </div>
  );
};

export default Preview;
