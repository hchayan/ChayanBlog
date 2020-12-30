import React, { useState } from "react";
import { authService } from "blogFirebase";

const ProfilePopup = ({ userObj }) => {
  const postCount = 0;
  const commentCount = 0;

  // 프로필 닉네임 수정
  const [nameChangeState, setNameChangeState] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = e => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onClickNameChange = () => {
    setNameChangeState(!nameChangeState);
  };

  const onSubmitName = async event => {
    event.stopPropagation();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }

    setNameChangeState(!nameChangeState);
  };

  // 프로필 이미지 업로드
  const onChangeImg = async () => {
    alert("프로필 이미지 변경 업데이트 예정");
  };

  // 로그아웃
  const onLogOutClick = () => authService.signOut();

  return (
    <div className="profile-popup--container">
      <div className="profile-popup__column">
        <div className="profile-img">
          <div className="profile-img--info">
            {userObj && userObj.photoURL ? (
              <img alt="프로필" src={userObj.photoURL} />
            ) : (
              <i class="fas fa-user"></i>
            )}
          </div>

          <label htmlFor="profile_file">업로드</label>
          <input
            id="profile_file"
            type="file"
            accept="image/*"
            onChange={onChangeImg}
          />
        </div>
      </div>
      <div className="profile-popup__column">
        <div className="profile-info">
          <div className="profile-name">
            {nameChangeState ? (
              <form onSubmit={onSubmitName}>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="닉네임"
                  value={newDisplayName}
                />
                <button className="profile-name--edit">변경</button>
              </form>
            ) : (
              <form onSubmit={onClickNameChange}>
                <p>{userObj ? userObj.displayName : "익명"}</p>
                <button className="profile-name--edit">수정</button>
              </form>
            )}
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
