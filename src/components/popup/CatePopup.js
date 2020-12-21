import { dbService } from "blogFirebase";
import React, { useEffect, useState } from "react";

const CatePopup = ({ cates, setCates }) => {
  const [inputCategory, setInputCategory] = useState("");
  const [dbCates, setdbCates] = useState([]);

  const onChangeAddCategory = e => {
    setInputCategory(e.target.value);
  };

  const addCategoryOnPost = async e => {
    e.preventDefault();
    if (!cates.includes(e.target.value)) {
      setCates([...cates, e.target.value]);
    }
  };

  const addDBCategory = async e => {
    e.preventDefault();
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
    const dbCategories = await dbService
      .collection("statics")
      .doc("categories")
      .get();

    setdbCates(dbCategories.data().name);
    console.log(dbCates);
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
        {dbCates.map(cate => {
          return (
            <input type="button" value={cate} onClick={addCategoryOnPost} />
          );
        })}
      </div>
    </div>
  );
};

export default CatePopup;
