import React, { useState, useEffect, useRef } from "react";
import Toc from "react-toc";
import { HashLink as Link } from "react-router-hash-link";

const TocNav = ({ tocRef, url, mdContents }) => {
  const [tocContents, setTocContents] = useState(false);
  const navRef = useRef();

  // contents = html in container
  const getTitle = async () => {
    const contents = tocRef.current;
    console.log(contents);
    if (contents !== null) {
      const titleRegex = /<[hH][\d](.*?[hH][\d]>)/g;
      const titles = await contents.matchAll(titleRegex);

      for (let title of titles) {
        const tag = title[0].substring(1, 3);
        const id = title[0].match(/".+"/)[0];
        console.log(tag);
        setTocContents(tocContents => [...tocContents, [tag, id]]);
      }
    }
  };

  const test = () => {};

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <div className="toc-contents" ref={navRef}>
      <Toc markdownText={mdContents} />
    </div>
  );
};

export default TocNav;
