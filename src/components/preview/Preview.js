import React, { useState } from "react";
import { Route } from "react-router-dom";
import PreviewMenu from "./PreviewMenu.js";
import PreviewInfo from "./PreviewInfo.js";
import PreviewArticles from "./PreviewArticles.js";

const Preview = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [postCount, setPostCount] = useState(0);

  return (
    <div className="preview">
      <PreviewMenu setSelectedCategory={setSelectedCategory} />
      <PreviewInfo postCount={postCount} />
      <Route path={["/", "/category"]}>
        <PreviewArticles
          selectedCategory={selectedCategory}
          setPostCount={setPostCount}
        />
      </Route>
      <Route
        path="/category/:tag"
        render={routerProps => (
          <PreviewArticles
            match={routerProps.match}
            selectedCategory={selectedCategory}
            setPostCount={setPostCount}
          />
        )}
      />
    </div>
  );
};

export default Preview;
