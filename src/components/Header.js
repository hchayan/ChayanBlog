import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import ProfilePopup from "./popup/ProfilePopup";

const Header = ({ loggedIn, userObj }) => {
  const [profilePopup, setProfilePopup] = useState(false);
  const toggleProfilePopup = () => {
    setProfilePopup(!profilePopup);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header__column">
          <div className=" header-logo">
            <Link to="/">
              <img
                alt="로고"
                src="https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e"
              />
            </Link>
          </div>
          <Nav />
        </div>

        <div className="header__column">
          {loggedIn ? (
            <>
              <div className="write-post">
                <Link to="/write">새 글 작성</Link>
              </div>

              <div className="header-profile" onClick={toggleProfilePopup}>
                {userObj && userObj.photoURL ? (
                  <img alt="프로필" src={userObj.photoURL} />
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>

              {profilePopup ? (
                <div className="profile-popup">
                  <ProfilePopup userObj={userObj} />
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="login">
                <Link to="/login">로그인</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
