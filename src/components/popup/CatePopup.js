import { dbService } from "blogFirebase";
import React, { useState } from "react";

const CatePopup = ({ cates, setCates }) => {
  const [dbCates, setdbCates] = useState({
    포스트: ["일상", "외부포스트"],
    기본개념: [
      "HTML 기본개념",
      "CSS 기본개념",
      "JS 기본개념",
      "React 기본개념",
    ],
    프로젝트: ["유투브 클론코딩", "블로그 구축 토이 프로젝트"],
  });

  const addCate = async (e) => {
    e.preventDefault();

    if (!cates.includes(e.target.value)) {
      setCates([...cates, e.target.value]);
    }
  };

  return (
    <div className="cates-popup">
      <div className="cates-popup__column">
        <input type="text" placeholder="추가할 카테고리를 적어주세요" />
      </div>
      <div className="tags-popup__column">{dbCates.keys}</div>
    </div>
  );
};

export default CatePopup;
