import React, { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";
import ManageNode from "./ManageNode";
import { addDBCategory, loadDBCategory } from "components/db/CategoryDB.js";

const ManageCategory = ({
  articles,
  categories,
  setCategories,
  getCategoryNames,
}) => {
  const [inputCategory, setInputCategory] = useState("");

  // load
  const loadCategory = async () => {
    const loadedDBCategory = await loadDBCategory();

    await loadedDBCategory.forEach((text, i) => {
      setCategories(prev => [...prev, { id: i, text }]);
    });
  };

  // onChange
  const onChangeAddCategory = e => {
    setInputCategory(e.target.value);
  };

  // remove
  const removeCategory = async e => {
    try {
      const removeCategory =
        e.target.parentNode.parentNode.childNodes[1].innerHTML;
      if (window.confirm(`정말로 '${removeCategory}' 를 삭제하시겠습니까 ?`)) {
        setCategories(
          categories.filter(category => category.text !== removeCategory)
        );

        alert("카테고리명이 삭제되었습니다.");
      }
    } catch (error) {
      alert("카테고리를 삭제하는데 실패했습니다. " + error.message);
    }
  };

  // add
  const isVaildCategory = categoryNames => {
    inputCategory.trim();
    if (inputCategory.length === 0) {
      return "공백은 입력할 수 없습니다";
    } else if (categoryNames.includes(inputCategory)) {
      return "이미 존재하는 카테고리명입니다";
    }
    return null;
  };

  const addCategory = async () => {
    const categoryNames = await getCategoryNames();

    const vaild = isVaildCategory(categoryNames);
    if (!vaild) {
      //await addDBCategory(categoryNames, inputCategory);

      setCategories([
        ...categories,
        { id: categories.length, text: inputCategory },
      ]);
      setInputCategory("");
    } else {
      alert(vaild);
    }
  };

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
    },
    [categories]
  );

  return (
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
            removeList={removeCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageCategory;
