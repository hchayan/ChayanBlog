import React, { useEffect, useState } from "react";
import { addDBCategory, loadDBCategory } from "../db/CategoryDB.js";

const CatePopup = ({ cates, setCates, setCatePopup, categoryRef }) => {
  const [inputCategory, setInputCategory] = useState("");
  const [dbCates, setdbCates] = useState([]);

  const addCategory = async () => {
    await addDBCategory(dbCates, inputCategory);

    setdbCates([...dbCates, inputCategory]);
    setInputCategory("");
  };

  const loadCategory = async () => {
    const loadedCategories = await loadDBCategory();
    setdbCates(loadedCategories);
  };

  const onChangeAddCategory = e => {
    setInputCategory(e.target.value);
  };

  const addCategoryOnPost = async e => {
    e.preventDefault();
    if (!cates.includes(e.target.value)) {
      setCates([e.target.value]);
      //setCates([...cates, e.target.value]);
    }
    setCatePopup(false);
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div className="cates-popup" ref={categoryRef}>
      <div className="cates-popup__column">
        <input
          type="text"
          value={inputCategory}
          onChange={onChangeAddCategory}
          placeholder="추가할 카테고리를 적어주세요"
        />
        <input type="button" value="추가" onClick={addCategory} />
      </div>
      <div className="cates-popup__column cates-list--btn">
        <select onChange={addCategoryOnPost}>
          <option disabled selected>
            === 카테고리를 선택해주세요 ===
          </option>
          {dbCates.map(cate => {
            return <option value={cate}>{cate}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default CatePopup;
