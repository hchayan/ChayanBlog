import React, { useEffect, useState } from "react";
import { addDBTag, loadDBTag } from "../db/TagDB.js";

const TagsPopup = ({ tags, setTags }) => {
  const [inputTag, setInputTag] = useState("");
  const [dbTags, setdbTags] = useState([]);

  const addTag = async () => {
    await addDBTag(dbTags, inputTag);

    setdbTags([...dbTags, inputTag]);
    setInputTag("");
  };

  const loadTag = () => {
    setdbTags(loadDBTag());
  };

  const onChangeAddTag = e => {
    setInputTag(e.target.value);
  };

  const addTagOnPost = async e => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    }
  };

  useEffect(() => {
    loadTag();
  }, []);

  return (
    <div className="tags-popup">
      <div className="tags-popup__column">
        <input
          type="text"
          value={inputTag}
          onChange={onChangeAddTag}
          placeholder="추가할 태그를 적어주세요"
        />
        <input type="button" value="추가" onClick={addTag} />
      </div>
      <div className="tags-popup__column tags-list--btn">
        {dbTags.map(dbtag => {
          return <input type="button" value={dbtag} onClick={addTagOnPost} />;
        })}
      </div>
    </div>
  );
};

export default TagsPopup;
