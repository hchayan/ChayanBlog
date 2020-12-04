import React from "react";
import MDEditor from "@uiw/react-md-editor";

const PreviewArticle = ({ article }) => {
  return (
    <div className="preview__article">
      <div className="article-thumbnail">
        {article.thumbnailId === "" ? null : <img src={article.thumbnailId} />}
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
        <div className="article-user">
          {article.user ? (
            <img src={article.user.photoURL} />
          ) : (
            <i class="fas fa-user"></i>
          )}
        </div>
      </div>
      {console.log(article)}
    </div>
  );
};

export default PreviewArticle;
