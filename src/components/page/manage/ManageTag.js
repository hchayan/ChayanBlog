import React, { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";
import ManageNode from "./ManageNode";
import { addDBTag, loadDBTag } from "components/db/TagDB.js";

const ManageTag = ({ tags, setTags, getTagNames }) => {
  const [inputTag, setInputTag] = useState("");

  // load
  const loadTag = async () => {
    const loadedDBTag = await loadDBTag();

    loadedDBTag.forEach((text, i) => {
      setTags(prev => [...prev, { id: i, text }]);
    });
  };

  // onChange
  const onChangeAddTag = e => {
    setInputTag(e.target.value);
  };

  // add
  const isVaildTag = tagNames => {
    inputTag.trim();
    if (inputTag.length === 0) {
      return "공백은 입력할 수 없습니다";
    } else if (tagNames.includes(inputTag)) {
      return "이미 존재하는 태그명입니다";
    }
    return null;
  };

  const addTag = async () => {
    const tagNames = await getTagNames();

    const vaild = isVaildTag(tagNames);
    if (!vaild) {
      await addDBTag(tagNames, inputTag);

      setTags([...tags, { id: tags.length, text: inputTag }]);
      setInputTag("");
    } else {
      alert(vaild);
    }
  };

  useEffect(() => {
    loadTag();
  }, []);

  // dnd
  const moveTag = useCallback(
    (dragIndex, hoverIndex) => {
      const dragNode = tags[dragIndex];
      setTags(
        update(tags, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragNode],
          ],
        })
      );
    },
    [tags]
  );

  return (
    <div className="manage-tags">
      <h2 className="tag-name">카테고리 관리</h2>

      <div className="tag-lists">
        <div className="tag-add">
          <input
            type="text"
            value={inputTag}
            onChange={onChangeAddTag}
            placeholder="추가할 카테고리명을 작성해주세요"
          />
          <input type="button" value="추가" onClick={addTag} />
        </div>
        {tags.map((tag, i) => (
          <ManageNode
            key={tag.id}
            index={i}
            text={tag.text}
            moveNode={moveTag}
            accept="tag"
          />
        ))}
      </div>
    </div>
  );
};

export default ManageTag;
