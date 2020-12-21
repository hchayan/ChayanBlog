import { dbService } from "blogFirebase";
import React, { useEffect, useState } from "react";

const TagsPopup = ({ tags, setTags }) => {
  const [inputTags, setInputTags] = useState("");
  const [dbTags, setdbTags] = useState([]);

  const onChangeAddTag = e => {
    setInputTags(e.target.value);
  };

  const addTagOnPost = async e => {
    if (!tags.includes(e.target.value)) {
      setTags([...tags, e.target.value]);
    }
  };

  // db에 태그 이름 추가
  const addDBTag = async () => {
    await dbService
      .collection("statics")
      .doc("tags")
      .set({
        name: [...dbTags, inputTags],
      });

    setdbTags([...dbTags, inputTags]);
    setInputTags("");
  };

  const loadDBTag = async () => {
    const dbLoadTags = await dbService.collection("statics").doc("tags").get();

    setdbTags(dbLoadTags.data().name);
  };

  useEffect(() => {
    loadDBTag();
  }, []);

  return (
    <div className="tags-popup">
      <div className="tags-popup__column">
        <input
          type="text"
          value={inputTags}
          onChange={onChangeAddTag}
          placeholder="추가할 태그를 적어주세요"
        />
        <input type="button" value="추가" onClick={addDBTag} />
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
