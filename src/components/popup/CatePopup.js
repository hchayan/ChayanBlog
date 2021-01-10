import { dbService } from "../../blogFirebase";
import React, { useEffect, useState } from "react";

const CatePopup = ({ cates, setCates, setCatePopup }) => {
  const [inputCategory, setInputCategory] = useState("");
  const [dbCates, setdbCates] = useState([]);

  const addDBCategory = async () => {
    await dbService
      .collection("statics")
      .doc("categories")
      .set({
        name: [...dbCates, inputCategory],
      });

    setdbCates([...dbCates, inputCategory]);
    setInputCategory("");
  };

  const loadDBCategory = async () => {
    const dbLoadCategories = await dbService
      .collection("statics")
      .doc("categories")
      .get();

    setdbCates(dbLoadCategories.data().name);
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
    loadDBCategory();
  }, []);

  return (
    <div className="cates-popup">
      <div className="cates-popup__column">
        <input
          type="text"
          value={inputCategory}
          onChange={onChangeAddCategory}
          placeholder="추가할 카테고리를 적어주세요"
        />
        <input type="button" value="추가" onClick={addDBCategory} />
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
