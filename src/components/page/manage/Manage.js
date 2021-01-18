import React, { useState, useEffect } from "react";
import { useHistory, Prompt } from "react-router-dom";
import { saveDBCategory } from "components/db/CategoryDB.js";
import { saveDBTag } from "components/db/TagDB.js";
import ManageCategory from "./ManageCategory";
import ManageTag from "./ManageTag";

const Manage = ({ userObj, articles }) => {
  let history = useHistory();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const getCategoryNames = async () => {
    let categoryNames = [];
    await categories.forEach(category => {
      categoryNames.push(category.text);
    });

    return categoryNames;
  };

  const getTagNames = async () => {
    let tagNames = [];
    await tags.forEach(tag => {
      tagNames.push(tag.text);
    });

    return tagNames;
  };

  // save
  const saveCategory = async () => {
    const categoryNames = await getCategoryNames();
    await saveDBCategory(categoryNames);
  };

  const saveTag = async () => {
    const tagNames = await getTagNames();
    await saveDBTag(tagNames);
  };

  const saveStatic = async () => {
    try {
      await saveCategory();
      await saveTag();
      alert("저장되었습니다");
    } catch (error) {
      alert("저장중에 문제가 발생했습니다. " + error.message);
    }
  };

  return (
    <div className="manage">
      <div className="manage__column">
        <div className="manage-header">
          <div className="manage-dummy"></div>
          <h2 className="manage-title">관리 및 설정</h2>
          <div className="manage-save" onClick={saveStatic}>
            저장
          </div>
        </div>
      </div>
      <div className="manage__column">
        <ManageCategory
          articles={articles}
          categories={categories}
          setCategories={setCategories}
          getCategoryNames={getCategoryNames}
        />
      </div>
      <div className="manage__column">
        <ManageTag tags={tags} setTags={setTags} getTagNames={getTagNames} />
      </div>
      <Prompt
        // when={isBlocking}
        message="정말로 페이지를 나가시겠습니까?  페이지를 나가면 수정한 내용이 초기화됩니다"
      />
    </div>
  );
};

export default Manage;
