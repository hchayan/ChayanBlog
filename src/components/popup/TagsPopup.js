import { dbService } from "blogFirebase";
import React, { useState } from "react";

const TagsPopup = ({ tags, setTags }) => {
  const [dbTags, setdbTags] = useState(["HTML", "CSS", "Javascript", "React"]);

  const addTag = async e => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    }
  };

  // db에 태그 이름 추가
  const addDBTag = () => {};

  // db에서 태그 삭제
  const removeDBTag = () => {};

  return (
    <div className="tags-popup">
      <div className="tags-popup__column">
        <input type="text" placeholder="추가할 태그를 적어주세요" />
        <input type="button" value="추가" />
      </div>
      <div className="tags-popup__column tags-list--btn">
        {dbTags.map(dbtag => {
          return <input type="button" value={dbtag} onClick={addTag} />;
        })}
      </div>
    </div>
  );
};

export default TagsPopup;
