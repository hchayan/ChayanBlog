import React, { useEffect, useState } from "react";
import { dbService } from "blogFirebase.js";

import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

const Post = ({ match, userObj, articleObj, setArticleObj }) => {
  const postID = match.params.id;
  const [postInfo, setPostInfo] = useState({});

  const getPost = async () => {
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
      });
      setArticleObj({ id: doc.id, ...doc.data() });
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post">
      <div className="post-wrapper">
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

              {articleObj && userObj && articleObj.userId === userObj.uid ? (
                <div className="post-edit">
                  <Link to="/edit">글 수정</Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="post-main">
          <div className="post-thumbnail">
            <img src={postInfo["thumbnail"]} />
          </div>
          <div className="post-contents">
            <MDEditor.Markdown source={postInfo["contents"]} />
          </div>
        </div>
      </div>

      <div className="post__nav"></div>
    </div>
  );
};

export default Post;
