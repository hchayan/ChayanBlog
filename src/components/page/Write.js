import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { dbService, storageService } from "blogFirebase";

import WriteInfo from "./WriteInfo";
import WriteForm from "./WriteForm";
import WriteAddon from "./WriteAddon";

// ======================================================================
const Write = ({ userObj }) => {
  // 게시글 정보
  const [thmubnailURL, setThumbnailURL] = useState("");
  const [objectURL, setObjectURL] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([
    "개인포스트",
    "React 기본개념",
    "블로그 구축 토이 프로젝트",
  ]);

  const [markdownContent, setMarkdownContent] = useState(`
  원하는 내용을 적어주세요
    `);

  let history = useHistory();

  // 로컬 이미지 업로드

  const onChangeImage = async (e) => {
    // 로컬 파일 읽어 변화 감지
    const {
      target: { files }, // event.target.files
    } = e;

    const theFile = files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // 공식 File API
      reader.readAsDataURL(theFile);

      reader.onerror = () => {
        reject(false);
      };
      reader.onloadend = (finishedEvent) => {
        // 아래 readURL 종료후 실행
        const {
          currentTarget: { result }, // result = finishedEvent.currantTarget.result
        } = finishedEvent;

        resolve(result);
      };
    });
  };

  // 게시글 업로드
  const onSubmit = async (event) => {
    event.preventDefault();

    // 1. 썸네일 있으면 사진 업로드후, 해당 URL을 받아옴

    // 2.db에 게시글 정보 업로드
    await dbService.collection("posts").add({
      thumbnailId: thmubnailURL,
      objId: objectURL,
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
        <WriteInfo
          userObj={userObj}
          thmubnailURL={thmubnailURL}
          onChangeImage={onChangeImage}
          setThumbnailURL={setThumbnailURL}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}
          categories={categories}
          setCategories={setCategories}
          tags={tags}
          setTags={setTags}
          onSubmit={onSubmit}
        />
      </div>
      <div className="write__column">
        <WriteAddon
          userObj={userObj}
          onChangeImage={onChangeImage}
          objectURL={objectURL}
          setObjectURL={setObjectURL}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}
        />
        <WriteForm
          userObj={userObj}
          onChangeImage={onChangeImage}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}
        />
      </div>
    </div>
  );
};

export default Write;
