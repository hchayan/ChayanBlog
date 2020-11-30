import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const Write = () => {
  const [markdownContent, setMarkdownContent] = useState(`
  # Hello, *world*!

  ### test
  `);

  const [tags, setTags] = useState([]);

  const [categories, setCategories] = useState(["1", "2", "3"]);

  const onSubmit = () => {};

  return (
    <div className="write">
      <div className="write__column">
        <div className="write-form">
          <form onSubmit={onSubmit}>
            <div className="write-form__column">
              <div className="write-thumbnail">
                <div className="thumbnail-preview">
                  <label htmlFor="write-thumbnail">썸네일 업로드</label>
                  <input type="file" id="write-thumbnail" accept="image/*" />
                </div>
              </div>
            </div>
            <div className="write-form__column">
              <div className="form-title">
                <input type="text" placeholder="제목을 입력하세요" />
              </div>

              <div className="write-tags">
                <div className="tags-lists">{tags}</div>
                <div className="write-add-tags">태그 추가</div>
              </div>
              <div className="write-category">
                <div className="cate-lists">{categories}</div>
                <div className="write-cate-tags">카테고리 추가</div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="write__column">
        <MDEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          height={810}
        />
      </div>
    </div>
  );
};

export default Write;
