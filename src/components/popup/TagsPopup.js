import { dbService } from "blogFirebase";
import React, { useState } from "react";

const TagsPopup = ({ tags, setTags }) => {
  const [dbTags, setdbTags] = useState(["HTML", "CSS", "Javascript", "React"]);

  const addTag = async (e) => {
    e.preventDefault();

    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    }
  };

  return (
    <div className="tags-popup">
      <div className="tags-popup__column">
        <input type="text" placeholder="추가할 태그를 적어주세요" />
      </div>
      <div className="tags-popup__column">
        {dbTags.map((dbtag) => {
          return <input type="button" value={dbtag} onClick={addTag} />;
        })}
      </div>
    </div>
  );
};

export default TagsPopup;
