import React, { useEffect } from "react";
import { authService } from "blogFirebase";

const ProfilePopup = ({ userObj }) => {
  const postCount = 0;
  const commentCount = 0;

  // 로그아웃
  const onLogOutClick = () => authService.signOut();

  return (
    <div className="profile-popup--container">
      <div className="profile-popup__column">
        <div className="profile-img">
          <div className="profile-img--info">
            {userObj.photoURL ? (
              <img src={userObj.photoURL} />
            ) : (
              <i class="fas fa-user"></i>
            )}
          </div>
          <button className="profile-img--edit">업로드</button>
        </div>
      </div>
      <div className="profile-popup__column">
        <div className="profile-info">
          <div className="profile-name">
            <p>{userObj ? userObj.displayName : "익명"}</p>
            <button className="profile-name--edit">수정</button>
          </div>
          <div className="profile-email">{userObj ? userObj.email : null}</div>
          <div className="profile-postInfo">
            <div className="post-count">글 {postCount}</div>
            <div className="comment-count">댓글 {commentCount}</div>
          </div>
          <div className="profile-nav">
            <button className="profile-info-edit">내정보</button>
            <button className="profile-logout" onClick={onLogOutClick}>
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
