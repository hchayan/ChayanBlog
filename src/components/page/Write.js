import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const Write = () => {
  const [markdownContent, setMarkdownContent] = useState(`
  # Hello, *world*!

  ### test
  `);

  return (
    <div className="write">
      <div className="write__column">
        <MDEditor value={markdownContent} onChange={setMarkdownContent} />
      </div>
    </div>
  );
};

export default Write;
