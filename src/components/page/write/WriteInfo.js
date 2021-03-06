import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import { storageService } from "../../../blogFirebase";
import TagsPopup from "../../popup/TagsPopup";
import CatePopup from "../../popup/CatePopup";

const WriteInfo = ({
  userObj,
  onChangeImage,
  markdownTitle,
  setMarkdownTitle,
  markdownContent,
  setMarkdownContent,
  thumbnailURL,
  setThumbnailURL,
  tags,
  setTags,
  categories,
  setCategories,
  onSubmit,
  isUploadable,
  setIsUploadable,
  isBlocking,
}) => {
  const categoryRef = useRef();
  const tagRef = useRef();
  const [tagPopup, setTagPopup] = useState(false); // 태그 창 열기
  const [catePopup, setCatePopup] = useState(false); // 카테고리 창 열기

  // model
  const handleClickCategoryOutside = ({ target }) => {
    if (
      catePopup &&
      categoryRef.current &&
      !categoryRef.current.contains(target)
    ) {
      setCatePopup(false);
      window.removeEventListener("click", handleClickCategoryOutside);
    }
  };

  const handleClickTagOutside = ({ target }) => {
    if (tagPopup && !tagRef.current.contains(target)) {
      setTagPopup(false);
      window.removeEventListener("click", handleClickTagOutside);
    }
  };

  const removeTag = e => {
    const name = e.target.parentNode.getAttribute("name");

    setTags(tags => tags.filter(tag => tag !== name));
  };

  const removeCate = e => {
    const name = e.target.parentNode.getAttribute("name");

    setCategories(categories => categories.filter(cate => cate !== name));
  };

  useEffect(() => {
    if (catePopup) {
      window.addEventListener("click", handleClickCategoryOutside);
    }
  }, [catePopup]);

  useEffect(() => {
    if (tagPopup) {
      window.addEventListener("click", handleClickTagOutside);
    }
  }, [tagPopup]);

  // 게시글 제목 적용
  const onChangeTitle = e => {
    const {
      target: { value },
    } = e;

    // 제목용 '# '를 최초 한번만 찾는 정규식
    //const titleRegex = new RegExp("(.*-1.*|.*# .*)");
    setMarkdownTitle(value);
  };

  const uploadThumbnail = async e => {
    try {
      setIsUploadable(false);
      if (e) {
        const result = await onChangeImage(e);

        if (thumbnailURL !== "") {
          try {
            await deleteThumbnail();
          } catch (error) {}
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
    } catch (error) {
      alert("썸네일 이미지를 업로드하는데 오류가 발생했습니다 : " + error);
    }
    setIsUploadable(true);
  };

  const deleteThumbnail = async () => {
    await storageService.refFromURL(thumbnailURL).delete();
  };

  return (
    <div className="write-form">
      <form onSubmit={onSubmit}>
        <div className="write-title">
          <div className="write-title__column addon"></div>
          <div className="write-title__column">게시글 작성</div>
          <div className="write-title__column submits">
            {isUploadable ? (
              <button type="submit">완료</button>
            ) : (
              <button>대기</button>
            )}
          </div>
        </div>
        <div className="write-contents">
          <div className="write-form__column">
            <div className="write-thumbnail">
              <div className="thumbnail-preview">
                {thumbnailURL !== "" ? <img src={thumbnailURL} /> : null}
                <label htmlFor="write-thumbnail">
                  {thumbnailURL !== "" ? null : "썸네일 업로드"}
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
            <div className="write-category">
              <div className="cate-lists">
                {categories.map(category => {
                  return (
                    <div className="cate-list">
                      {category}
                      <div
                        className="cate-delete"
                        name={category}
                        onClick={removeCate}
                      >
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
              {catePopup ? (
                <CatePopup
                  cates={categories}
                  setCates={setCategories}
                  setCatePopup={setCatePopup}
                  categoryRef={categoryRef}
                />
              ) : null}
              <div
                className="write-cate-tags"
                onClick={() => {
                  setCatePopup(true);
                }}
              >
                카테고리 선택
              </div>
            </div>

            <div className="form-title">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                onChange={onChangeTitle}
                value={markdownTitle}
              />
            </div>

            <div className="write-tags">
              <div className="tags-list">
                {tags.map(tag => {
                  return (
                    <div className="tag-list" name={tag}>
                      {tag}
                      <div
                        className="tag-delete"
                        name={tag}
                        onClick={removeTag}
                      >
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
              {tagPopup ? (
                <TagsPopup tags={tags} setTags={setTags} tagRef={tagRef} />
              ) : null}
              <div
                className="write-add-tags"
                onClick={() => {
                  setTagPopup(true);
                }}
              >
                태그 추가
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteInfo;
