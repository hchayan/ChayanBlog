import React, { useState, useEffect } from "react";
import { dbService } from "../../../blogFirebase.js";

const Manage = ({ userObj }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const getCategoryAndTag = () => {
    dbService
      .collection("statics")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data().name);
          if (doc.id === "tags") {
            setTags(doc.data().name);
          } else if (doc.id === "categories") {
            setCategories(doc.data().name);
          }
        });
      });
  };

  useEffect(() => {
    getCategoryAndTag();
  }, []);

  return (
    <div className="manage">
      <div className="manage__column">
        <div className="matage-title">관리 및 설정</div>
      </div>
      <div className="manage__column">
        <div className="manage-categories">
          <div className="category-name">카테고리 목록</div>
          <div className="category-lists">
            {categories.map(category => (
              <div className="category-list">{category}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="manage__column">
        <div className="manage-tags">
          <div className="tag-name">태그 목록</div>
          <div className="tag-lists">
            {tags.map(tag => (
              <div className="tag-list">{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
