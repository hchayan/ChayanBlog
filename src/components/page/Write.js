import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { dbService, storageService } from "blogFirebase";

import WriteInfo from "./WriteInfo";
import WriteForm from "./WriteForm";
import WriteAddon from "./WriteAddon";

// ======================================================================
const Write = ({ userObj, articleObj }) => {
  // 게시글 정보
  const [thmubnailURL, setThumbnailURL] = useState("");
  const [objectURL, setObjectURL] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [markdownTitle, setMarkdownTitle] = useState(``);
  const [markdownContent, setMarkdownContent] = useState(``);

  let history = useHistory();

  // edit 기능
  // 1. 우선, 글의 user와 현재로그인되있는 user 일치하는지 확인 (불일치시 article로)
  console.log(articleObj);
  // 2. article 내용 불러오기

  // 3. 날짜 수정 영역 불러오기

  // 4. 완료시 수정완료 물어보기 처리

  // Write 기능
  // 로컬 이미지 업로드
  const onChangeImage = async e => {
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
      reader.onloadend = finishedEvent => {
        // 아래 readURL 종료후 실행
        const {
          currentTarget: { result }, // result = finishedEvent.currantTarget.result
        } = finishedEvent;

        resolve(result);
      };
    });
  };

  // 게시글 업로드
  const onSubmit = async event => {
    event.preventDefault();

    // 1. 정말로 게시할지 물어보기
    if (window.confirm("작성하신 게시글을 정말로 게시하시겠습니까?")) {
      // 2.db에 게시글 정보 업로드
      await dbService.collection("posts").add({
        thumbnailId: thmubnailURL,
        objId: objectURL,
        postTag: tags,
        postTypes: categories,
        title: markdownTitle,
        contents: markdownContent,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        userId: userObj.uid,
        userName: userObj.displayName,
        userImage: userObj.photoURL,
        commentsId: [],
      });

      history.push("/");

      alert("게시글이 작성되었습니다");
    }
  };

  return (
    <div className="write">
      <div className="write__column">
        <WriteInfo
          userObj={userObj}
          thmubnailURL={thmubnailURL}
          onChangeImage={onChangeImage}
          setThumbnailURL={setThumbnailURL}
          markdownTitle={markdownTitle}
          setMarkdownTitle={setMarkdownTitle}
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
