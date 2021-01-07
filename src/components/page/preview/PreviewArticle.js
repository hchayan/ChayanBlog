import React from "react";
import MDEditor from "@uiw/react-md-editor";

import { Link } from "react-router-dom";

const PreviewArticle = ({ article, marked }) => {
  return (
    <Link to={`/post/${article.title.substring(2)}`}>
      <div className="preview__article">
        {marked ? (
          <div className="article-marked">
            <i class="fas fa-bookmark"></i>
          </div>
        ) : null}
        {article.thumbnailId !== "" ? (
          <div className="article-thumbnail">
            <img src={article.thumbnailId} alt="thumbnail" />
            <div className="article-categories">
              {article.postTypes.map(type => {
                return (
                  <div key={type} className="article-category">
                    {type}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="article-no-thumbnail">
            <div className="article-categories">
              {article.postTypes.map(type => {
                return (
                  <div key={type} className="article-category">
                    {type}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="article-title">{article.title.substring(2)}</div>
        <div className="article-contents">
          <MDEditor.Markdown source={article.contents} />
        </div>
        {article.thumbnailId === "" ? (
          <div className="article-blank"></div>
        ) : null}
        <div className="article-tags">
          {article.postTag.map(tag => {
            return (
              <div key={tag} className="article-tag">
                {tag}
              </div>
            );
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
