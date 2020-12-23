import React from "react";

const PreviewInfo = ({ postCount }) => {
  return (
    <div className="preview__info">
      <div className="preview__info__column">
        총 <span>{postCount}</span>개의 포스트
      </div>
      <div className="preview__info__column">최신순</div>
    </div>
  );
};

export default PreviewInfo;
