import React from "react";
import MDEditor from "@uiw/react-md-editor";

import { Link } from "react-router-dom";

const PreviewArticle = ({ article }) => {
  const id = `/post/${article.id}`;
  return (
    <Link to={`/post/${article.title.substring(2)}`}>
      <div className="preview__article">
        <div className="article-thumbnail">
          {article.thumbnailId === "" ? null : (
            <img src={article.thumbnailId} />
          )}
          <div className="article-categories">
            {article.postTypes.map(type => {
              return <div className="article-category">{type}</div>;
            })}
          </div>
        </div>
        <div className="article-title">{article.title.substring(2)}</div>
        <div className="article-contents">
          <MDEditor.Markdown source={article.contents} />
        </div>
        <div className="article-tags">
          {article.postTag.map(tag => {
            return <div className="article-tag">{tag}</div>;
          })}
        </div>
        <div className="article-info">
          <div className="article-modifiedAt">
            {`${new Date(article.modifiedAt).getFullYear()}년 ${
              new Date(article.modifiedAt).getMonth() + 1
            }월 ${new Date(article.modifiedAt).getDate()}일`}
          </div>
          <div
            className="article-user"
            title={article.userName ? article.userName : "익명"}
          >
            {article.userImage ? (
              <img src={article.userImage} />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PreviewArticle;
