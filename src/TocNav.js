import React from "react";
import Toc from "react-toc";
import { HashLink as Link } from "react-router-hash-link";

const TocNav = ({ url, contents }) => {
  return (
    <>
      <Toc markdownText={contents ? contents : ""} type="raw" />
      <Link to={`/post/${url}#SPA 란?`}>Go To Anchor</Link>
    </>
  );
};

export default TocNav;
