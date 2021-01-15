import React, { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";
import { dbService } from "../../../blogFirebase.js";
import ManageNode from "./ManageNode";

const Manage = ({ userObj }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // load
  const getCategoryAndTag = () => {
    dbService
      .collection("statics")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === "tags") {
            doc.data().name.forEach((text, i) => {
              setTags(prev => [...prev, { id: i, text }]);
            });
          } else if (doc.id === "categories") {
            doc.data().name.forEach((text, i) => {
              setCategories(prev => [...prev, { id: i, text }]);
            });
          }
        });
      });
  };

  useEffect(() => {
    getCategoryAndTag();
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
        <h2 className="manage-title">관리 및 설정</h2>
      </div>
      <div className="manage__column">
        <div className="manage-categories">
          <h2 className="category-name">카테고리 목록</h2>
          <div className="category-lists">
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
          <h2 className="tag-name">태그 목록</h2>
          <div className="tag-lists">
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
