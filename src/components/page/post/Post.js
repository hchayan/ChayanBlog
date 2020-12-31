import React, { useEffect, useState, useRef } from "react";
import { dbService, storageService } from "blogFirebase.js";
import TocNav from "TocNav.js";
import Comments from "../../comment/Comments.js";

import MDEditor from "@uiw/react-md-editor";
import { Link, useHistory } from "react-router-dom";

const Post = ({ match, userObj, articleObj, setArticleObj }) => {
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postInfo, setPostInfo] = useState({});
  const postID = match.params.id;
  const tocRef = useRef();

  const insertTitleName = () => {
    const toCheck = ["h1", "h2", "h3", "h4", "h5", "h6"];

    toCheck.forEach(checkTag => {
      const title = document.querySelectorAll(checkTag);
      title.forEach(node => {
        node.setAttribute(
          "id",
          node.innerHTML.replace(/[\s|?]/g, "-").toLowerCase()
        );
      });
    });
  };

  const getPost = async () => {
    try {
      const post = await dbService
        .collection("posts")
        .where("title", "==", `# ${postID}`)
        .get();

      await post.forEach(doc => {
        setPostInfo({
          types: doc.data().postTypes,
          title: doc.data().title,
          date: doc.data().modifiedAt,
          user: doc.data().userName,
          tags: doc.data().postTag,
          thumbnail: doc.data().thumbnailId,
          contents: doc.data().contents,
          objId: doc.data().objId,
        });
        setArticleObj({ id: doc.id, ...doc.data() });
      });

      await insertTitleName();
      setLoading(false);
    } catch (error) {
      alert("게시글을 불러오지 못했습니다 : " + error.message);
      history.push("/");
    }
  };

  const deletePost = async () => {
    try {
      if (window.confirm("정말로 게시글을 삭제 하시겠습니까?")) {
        // 게시글 사진 삭제
        if (postInfo.thumbnail) {
          await storageService.refFromURL(postInfo.thumbnail).delete();
        }
        // 게시글 object파일들 삭제
        await postInfo["objId"].forEach(obj => {
          storageService.refFromURL(obj).delete();
        });
        // 게시글 삭제
        await dbService.doc(`/posts/${articleObj.id}`).delete();

        alert("게시글이 제거되었습니다.");
        history.push("/");
      }
    } catch (error) {
      alert("게시글 삭제하는데 실패했습니다 : " + error);
      history.push("/");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post">
      {loading ? (
        <div className="Loading">{error}</div>
      ) : (
        <div className="post-wrapper">
          <div className="post-wrapper__column">
            <div className="post-head">
              <div className="post-categories">
                {postInfo["types"] &&
                  postInfo["types"].map(type => {
                    return (
                      <div key={type} className="post-category">
                        {type}
                      </div>
                    );
                  })}
              </div>
              <div className="post-title">
                {postInfo["title"] && postInfo["title"].substring(2)}
              </div>
              <div className="post-info">
                <div className="post-info__column">
                  <div className="post-tags">
                    {postInfo["tags"] &&
                      postInfo["tags"].map(tag => {
                        return (
                          <div key={tag} className="post-tag">
                            {tag}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="post-info__column">
                  <div className="post-date">
                    {`${new Date(postInfo["date"]).getFullYear()}년 ${
                      new Date(postInfo["date"]).getMonth() + 1
                    }월 ${new Date(postInfo["date"]).getDate()}일`}
                  </div>
                  <div className="post-user">{postInfo["user"]}</div>

                  {articleObj &&
                  userObj &&
                  articleObj.userId === userObj.uid ? (
                    <div className="post-manage">
                      <div className="post-edit">
                        <Link to="/edit">수정</Link>
                      </div>
                      <div className="post-delete" onClick={deletePost}>
                        삭제
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="post-main">
              <div className="post-toc"></div>
              <div className="post-thumbnail">
                <img src={postInfo["thumbnail"]} alt="thumbnail" />
              </div>
              <div className="post-contents">
                <div className="post-content" ref={tocRef}>
                  <MDEditor.Markdown source={postInfo["contents"]} />
                </div>
              </div>
            </div>

            <div className="post-comments">
              <Comments />
            </div>
          </div>
          {!loading ? (
            <>
              <div className="post-wrapper__column">
                <TocNav
                  tocRef={tocRef}
                  url={match.params.id}
                  mdContents={
                    Object.keys(postInfo).length > 0 ? postInfo["contents"] : ""
                  }
                />
              </div>
            </>
          ) : (
            <div className="loading">로딩중</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
