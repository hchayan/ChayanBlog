import React from "react";

const ProfilePopup = () => {
  const name = "Chayan3";
  const email = "chayans999@gmail.com";
  const postCount = 0;
  const commentCount = 0;

  return (
    <div className="profile-popup--container">
      <div className="profile-popup__column">
        <div className="profile-img">
          <div className="profile-img--info"></div>
          <button className="profile-img--edit">업로드</button>
        </div>
      </div>
      <div className="profile-popup__column">
        <div className="profile-info">
          <div className="profile-name">
            <p>{name}</p>
            <button className="profile-name--edit">수정</button>
          </div>
          <div className="profile-email">{email}</div>
          <div className="profile-postInfo">
            <div className="post-count">글 {postCount}</div>
            <div className="comment-count">댓글 {commentCount}</div>
          </div>
          <div className="profile-nav">
            <button className="profile-info-edit">내정보</button>
            <button className="profile-logout">로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
