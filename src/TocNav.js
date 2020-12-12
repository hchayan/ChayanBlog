import React, { useState, useEffect, useRef } from "react";
import Toc from "react-toc-hash-link";
import { HashLink as Link } from "react-router-hash-link";

const TocNav = ({ tocRef, url, mdContents }) => {
  const navref = useRef();
  const [contentFlag, setContentFlag] = useState(false);
  const [tocContent, setTocContent] = useState([]);

  // contents = html in container
  const getTitle = async () => {
    const contents = tocRef.current;
    // contents dom to stirng
    console.log(contents);
    if (contents !== null) {
      const titleRegex = /<[hH][\d](.*?[hH][\d]>)/g;
      const titles = await contents.matchAll(titleRegex);

      for (let title of titles) {
        const tag = title[0].substring(1, 3);
        const id = title[0].match(/".+"/)[0];
        console.log(tag);
      }
    }
  };

  const test = () => {
    setContentFlag(true);

    setTocContent(document.querySelectorAll(".post-toc a"));
    console.log(tocContent);
  };

  useEffect(() => {
    test();
  }, [contentFlag]);

  return (
    <>
      <div className="nav-toc" ref={navref}>
        {mdContents !== "" ? <Toc markdownText={mdContents} url={url} /> : null}
      </div>
    </>
  );
};

export default TocNav;
