import React, { useEffect, useState, useRef } from "react";

import { useHistory, Prompt } from "react-router-dom";

import { dbService, storageService } from "../../../blogFirebase";

import WriteInfo from "./WriteInfo";
import WriteForm from "./WriteForm";
import WriteAddon from "./WriteAddon";

const Write = ({ userObj, articleObj }) => {
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [objectURL, setObjectURL] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [markdownTitle, setMarkdownTitle] = useState(``);
  const [markdownContent, setMarkdownContent] = useState(``);

  const [isBlocking, setIsBlocking] = useState(true);
  const [isUploadable, setIsUploadable] = useState(true);

  // unmount 확인용
  const thumbnailURLRef = useRef();
  const objectURLRef = useRef();
  const isBlockingRef = useRef();
  thumbnailURLRef.current = thumbnailURL;
  objectURLRef.current = objectURL;
  isBlockingRef.current = isBlocking;

  let history = useHistory();

  // edit 기능
  const loadArticle = () => {
    if (
      articleObj &&
      articleObj !== null &&
      Object.keys(articleObj).length > 0
    ) {
      setMarkdownTitle(articleObj.title.substring(2));
      setMarkdownContent(articleObj.contents);
      setThumbnailURL(articleObj.thumbnailId);
      setTags(articleObj.postTag);
      setCategories(articleObj.postTypes);
    }
  };

  // 글의 user와 현재로그인되있는 user 일치하는지 확인 (불일치시 article로)
  const checkUserVaild = () => {
    if (articleObj === null) {
      alert("게시글을 새로고침하면 오류 발생 ");
      history.push("/");
    }

    if (
      articleObj &&
      articleObj !== null &&
      Object.keys(articleObj).length > 0 &&
      articleObj.userId !== userObj.uid
    ) {
      alert("글을 수정할 권한이 없습니다");
      history.push("/");
    }
    loadArticle();
  };

  useEffect(() => {
    checkUserVaild();
  }, []);

  // 로컬 이미지 업로드
  const onChangeImage = async e => {
    try {
      const {
        target: { files },
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
    } catch (error) {
      alert("이미지를 불러오는데 오류가 발생했습니다. 오류코드 : " + error);
    }
  };

  const checkSubmitVaild = () => {
    if (markdownTitle.length === 0) {
      return "게시글의 제목이 없습니다.";
    }

    if (markdownContent.length === 0) {
      return "게시글의 내용이 없습니다.";
    }

    if (categories.length === 0) {
      return "게시글은 무조건 카테고리를 지정해줘야 합니다.";
    }
  };

  const writePostOnDB = async () => {
    try {
      // 1. 정말로 게시할지 물어보기
      if (window.confirm("작성하신 게시글을 정말로 게시하시겠습니까?")) {
        const vaild = checkSubmitVaild();
        if (vaild) {
          alert(vaild);
        } else {
          // 2.db에 게시글 정보 업로드
          await dbService.collection("posts").add({
            thumbnailId: thumbnailURL,
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
      }
    } catch (error) {
      alert("게시글을 작성하는데 오류가 발생했습니다. 오류코드 : " + error);
    }
  };

  const editPostOnDB = async () => {
    try {
      if (window.confirm("정말로 게시글을 수정 하시겠습니까?")) {
        const vaild = checkSubmitVaild();
        if (vaild) {
          alert(vaild);
        } else {
          await dbService.doc(`/posts/${articleObj.id}`).update({
            thumbnailId: thumbnailURL,
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
    } catch (error) {
      alert("게시글을 수정하는데 오류가 발생했습니다. 오류코드 : " + error);
    }
  };

  // 게시글 업로드
  const onSubmit = e => {
    e.preventDefault();
    setIsBlocking(false);

    if (Object.keys(articleObj).length === 0) {
      writePostOnDB();
    } else {
      editPostOnDB();
    }
  };

  const unExpectedExit = async () => {
    if (isBlockingRef.current) {
      if (thumbnailURLRef.current.length > 0) {
        await storageService.refFromURL(thumbnailURLRef.current).delete();
      }
      if (objectURLRef.current.length > 0) {
        await objectURLRef.current.forEach(objectRef => {
          storageService.refFromURL(objectRef).delete();
        });
      }
    }
  };

  useEffect(() => {
    return () => unExpectedExit();
  }, []);

  return (
    <div className="write">
      <div className="write__column">
        <WriteInfo
          userObj={userObj}
          thumbnailURL={thumbnailURL}
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
          isUploadable={isUploadable}
          setIsUploadable={setIsUploadable}
          isBlocking={isBlocking}
        />
      </div>
      <div className="write__column">
        <WriteForm
          userObj={userObj}
          onChangeImage={onChangeImage}
          objectURL={objectURL}
          setObjectURL={setObjectURL}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}
          setIsUploadable={setIsUploadable}
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
