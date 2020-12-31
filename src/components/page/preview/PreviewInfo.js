import React from "react";

const PreviewInfo = ({ postCount, orderBy, setOrderBy }) => {
  const onClickOrderBy = () => {
    setOrderBy(prev => !prev);
  };

  return (
    <div className="preview__info">
      <div className="preview__info__column">
        총 <span>{postCount}</span>개의 포스트
      </div>
      <div className="preview__info__column" onClick={onClickOrderBy}>
        {orderBy ? "최신순" : "오래된 순"}
      </div>
    </div>
  );
};

export default PreviewInfo;
