import React, { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";
import { dbService } from "../../../blogFirebase.js";
import ManageNode from "./ManageNode";
import {
  saveDBCategory,
  addDBCategory,
  loadDBCategory,
} from "components/db/CategoryDB.js";

const Manage = ({ userObj }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputCategory, setInputCategory] = useState("");
  const [inputTag, setInputTag] = useState("");

  // load
  const loadCategory = async () => {
    const loadedDBCategory = await loadDBCategory();

    loadedDBCategory.forEach((text, i) => {
      setCategories(prev => [...prev, { id: i, text }]);
    });
  };

  const getDBCategory = async () => {
    let dbCategories = [];
    await categories.forEach(category => {
      dbCategories.push(category.text);
    });

    return dbCategories;
  };

  // save
  const saveCategory = async () => {
    try {
      const dbCategories = await getDBCategory();
      await saveDBCategory(dbCategories);
      alert("저장되었습니다.");
    } catch (error) {
      alert("저장중에 문제가 발생했습니다. " + error.message);
    }
  };

  // onChange
  const onChangeAddCategory = e => {
    setInputCategory(e.target.value);
  };

  const onChangeAddTag = e => {
    setInputTag(e.target.value);
  };

  // add
  const addCategory = async () => {
    const dbCategories = await getDBCategory();
    await addDBCategory(dbCategories, inputCategory);

    setCategories([
      ...categories,
      { id: categories.length, text: inputCategory },
    ]);
    setInputCategory("");
  };

  const addTag = async () => {};

  useEffect(() => {
    loadCategory();
  }, []);

  // dnd
  const moveCategory = useCallback(
    (dragIndex, hoverIndex) => {
      const dragNode = categories[dragIndex];
      setCategories(
        update(categories, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragNode],
          ],
        })
      );
      // 변화있으면 저장
      console.log(categories);
    },
    [categories]
  );

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
        <div className="manage-categories">
          <h2 className="category-name">카테고리 관리</h2>

          <div className="category-lists">
            <div className="category-add">
              <input
                type="text"
                value={inputCategory}
                onChange={onChangeAddCategory}
                placeholder="추가할 카테고리명을 작성해주세요"
              />
              <input type="button" value="추가" onClick={addCategory} />
            </div>
            {categories.map((category, i) => (
              <ManageNode
                key={category.id}
                index={i}
                text={category.text}
                moveNode={moveCategory}
                accept="category"
              />
            ))}
          </div>
        </div>
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
