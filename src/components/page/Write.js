import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useHistory } from "react-router-dom";

import { dbService } from "blogFirebase";

const Write = () => {
  // 게시글 정보
  const [tags, setTags] = useState(["javascript", "css", "html"]);
  const [categories, setCategories] = useState([
    "개인포스트",
    "React 기본개념",
    "블로그 구축 토이 프로젝트",
  ]);

  const [markdownContent, setMarkdownContent] = useState(`
  원하는 내용을 적어주세요
  `);

  let history = useHistory();

  const onChangeTitle = (e) => {
    const {
      target: { value },
    } = e;

    // 제목용 '# '를 최초 한번만 찾는 정규식
    const titleRegex = new RegExp("(.*-1.*|.*# .*)");
    setMarkdownContent(`# ${value}` + markdownContent.replace(titleRegex, ""));
  };

  const onChangeThumbnail = () => {};

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("posts").add({
      thumbnailId: null,
      postTag: tags,
      postTypes: categories,
      contents: markdownContent,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });

    history.push("/");
  };

  return (
    <div className="write">
      <div className="write__column">
        <div className="write-form">
          <form onSubmit={onSubmit}>
            <div className="write-title">
              <div className="write-title__column addon"></div>
              <div className="write-title__column">게시글 작성</div>
              <div className="write-title__column submits">
                <button>임시저장</button>
                <button type="submit">완료</button>
              </div>
            </div>
            <div className="write-contents">
              <div className="write-form__column">
                <div className="write-thumbnail">
                  <div className="thumbnail-preview">
                    <label htmlFor="write-thumbnail">썸네일 업로드</label>
                    <input
                      type="file"
                      id="write-thumbnail"
                      accept="image/*"
                      onChange={onChangeThumbnail}
                    />
                  </div>
                </div>
              </div>
              <div className="write-form__column">
                <div className="form-title">
                  <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    onChange={onChangeTitle}
                  />
                </div>

                <div className="write-tags">
                  <div className="tags-list">
                    {tags.map((tag) => {
                      return (
                        <div className="tag-list" name={tag}>
                          {tag}
                          <div className="tag-delete">
                            <i className="fas fa-times"></i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="write-add-tags">태그 추가</div>
                </div>
                <div className="write-category">
                  <div className="cate-lists">
                    {categories.map((category) => {
                      return (
                        <div className="cate-list">
                          {category}
                          <div className="cate-delete">
                            <i class="fas fa-times"></i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="write-cate-tags">카테고리 추가</div>
                </div>
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
