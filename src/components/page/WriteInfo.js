import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { storageService } from "blogFirebase";
import TagsPopup from "components/popup/TagsPopup";
import CatePopup from "components/popup/CatePopup";

const WriteInfo = ({
  userObj,
  onChangeImage,
  markdownContent,
  setMarkdownContent,
  thmubnailURL,
  setThumbnailURL,
  tags,
  setTags,
  categories,
  setCategories,
  onSubmit,
}) => {
  // 게시글 제목 적용
  const onChangeTitle = (e) => {
    const {
      target: { value },
    } = e;

    // 제목용 '# '를 최초 한번만 찾는 정규식
    const titleRegex = new RegExp("(.*-1.*|.*# .*)");
    setMarkdownContent(`# ${value}` + markdownContent.replace(titleRegex, ""));
  };

  const uploadThumbnail = async (e) => {
    if (e) {
      const result = await onChangeImage(e);

      if (thmubnailURL !== "") {
        await deleteTumbnail();
      }
      // 업로드
      if (result) {
        const attachmentRef = storageService
          .ref()
          .child(`/posts/thumbnails/${userObj.uid}/${uuidv4()}`); // 저장경로설정 '사용자id/랜덤파일이름'
        const response = await attachmentRef.putString(result, "data_url"); // (저장할파일, 데이터 형식)
        const tmpThumbnailURL = await response.ref.getDownloadURL();
        setThumbnailURL(tmpThumbnailURL);
      }
    }
  };

  // 썸네일 이미지 업로드
  const deleteTumbnail = async () => {
    await storageService.refFromURL(thmubnailURL).delete();
  };

  // 태그 창 열기
  const [tagPopup, setTagPopup] = useState(false);

  const toggleTagPopup = () => {
    setTagPopup(!tagPopup);
  };

  // 카테고리 창 열기
  const [catePopup, setCatePopup] = useState(false);

  const toggleCatePopup = () => {
    setCatePopup(!catePopup);
  };

  return (
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
                {thmubnailURL !== "" ? <img src={thmubnailURL} /> : null}
                <label htmlFor="write-thumbnail">
                  {thmubnailURL !== "" ? null : "썸네일 업로드"}
                </label>
                <input
                  type="file"
                  id="write-thumbnail"
                  accept="image/*"
                  onChange={uploadThumbnail}
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
                {tagPopup ? <TagsPopup tags={tags} setTags={setTags} /> : null}
              </div>
              <div className="write-add-tags" onClick={toggleTagPopup}>
                태그 추가
              </div>
            </div>
            <div className="write-category">
              <div className="cate-lists">
                {categories.map((category) => {
                  return (
                    <div className="cate-list">
                      {category}
                      <div className="cate-delete">
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                  );
                })}
                {catePopup ? (
                  <CatePopup cates={categories} setCates={setCategories} />
                ) : null}
              </div>
              <div className="write-cate-tags" onClick={toggleCatePopup}>
                카테고리 추가
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteInfo;