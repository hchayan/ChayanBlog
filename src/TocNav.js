import React from "react";
import Toc from "react-toc";

const TocNav = ({ contents }) => {
  return (
    <>
      <Toc markdownText={contents ? contents : ""} />
    </>
  );
};

export default TocNav;
