import React, { useState, useCallback } from "react";
import { saveDBCategory } from "components/db/CategoryDB.js";
import update from "immutability-helper";
import ManageNode from "./ManageNode";
import ManageCategory from "./ManageCategory";

const Manage = ({ userObj }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const getCategoryNames = async () => {
    let categoryNames = [];
    await categories.forEach(category => {
      categoryNames.push(category.text);
    });

    return categoryNames;
  };

  // save
  const saveCategory = async () => {
    try {
      const categoryNames = await getCategoryNames();
      await saveDBCategory(categoryNames);
      alert("저장되었습니다.");
    } catch (error) {
      alert("저장중에 문제가 발생했습니다. " + error.message);
    }
  };

  const onChangeAddTag = e => {
    setInputTag(e.target.value);
  };

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
    <div className="manage">
      <div className="manage__column">
        <div className="manage-header">
          <div className="manage-dummy"></div>
          <h2 className="manage-title">관리 및 설정</h2>
          <div className="manage-save" onClick={saveCategory}>
            저장
          </div>
        </div>
      </div>
      <div className="manage__column">
        <ManageCategory
          categories={categories}
          setCategories={setCategories}
          getCategoryNames={getCategoryNames}
        />
      </div>
      <div className="manage__column">
        <div className="manage-tags">
          <h2 className="tag-name">태그 관리</h2>
          <div className="tag-lists">
            <div className="tag-add">
              <input type="text" placeholder="추가할 태그명을 작성해주세요" />
              <input type="button" value="추가" />
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
      </div>
    </div>
  );
};

export default Manage;
