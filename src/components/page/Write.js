import React, { useEffect, useState } from "react";
import { useHistory, Prompt } from "react-router-dom";

import { dbService } from "blogFirebase";

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
  const [isBlocking, setIsBlocking] = useState(false);

  let history = useHistory();

  // edit 기능
  // 2. article 내용 불러오기
  const loadArticle = () => {
    if (articleObj !== null) {
      setMarkdownTitle(articleObj.title.substring(2));
      setMarkdownContent(articleObj.contents);
      setThumbnailURL(articleObj.thumbnailId);
      setTags(articleObj.postTag);
      setCategories(articleObj.postTypes);
    }
  };

  // 1. 우선, 글의 user와 현재로그인되있는 user 일치하는지 확인 (불일치시 article로)
  const checkUserVaild = () => {
    if (articleObj === null) {
      alert("게시글을 새로고침하면 오류 발생 ");

      history.push("/");
    }
    if (articleObj && articleObj.userId !== userObj.uid) {
      alert("글을 수정할 권한이 없습니다");

      history.push("/");
    }
    loadArticle();
  };

  // 3. 날짜 수정 영역 불러오기

  useEffect(() => {
    checkUserVaild();
    setIsBlocking(true);
  }, []);

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
    setIsBlocking(false);

    // write or edit 여부
    if (articleObj === null) {
      // write일때,
      // 1. 정말로 게시할지 물어보기
      if (window.confirm("작성하신 게시글을 정말로 게시하시겠습니까?")) {
        // 2.db에 게시글 정보 업로드
        await dbService.collection("posts").add({
          thumbnailId: thmubnailURL,
          objId: objectURL,
          postTag: tags,
          postTypes: categories,
          title: `# ${markdownTitle}`,
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
    } else {
      // edit일때,
      if (window.confirm("정말로 게시글을 수정 하시겠습니까?")) {
        // 4. 완료시 수정완료 물어보기 처리(변화한거만 처리)
        await dbService.doc(`/posts/${articleObj.id}`).update({
          thumbnailId: thmubnailURL,
          objId: objectURL,
          postTag: tags,
          postTypes: categories,
          title: `# ${markdownTitle}`,
          contents: markdownContent,
          modifiedAt: Date.now(),
        });

        history.push("/");

        alert("게시글이 수정되었습니다");
      }
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
      <Prompt
        when={isBlocking}
        message="정말로 페이지를 나가시겠습니까?  페이지를 나가면 작성중인 페이지를 읽어버립니다"
      />
    </div>
  );
};

export default Write;
