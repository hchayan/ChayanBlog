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
              <img src="https://firebasestorage.googleapis.com/v0/b/chayanblog.appspot.com/o/static%2Flogo.svg?alt=media&token=1506f45c-8be3-40b1-8bb1-2c55f750109e" />
            </Link>
          </div>
          <Nav />
        </div>

        <div className="header__column">
          {loggedIn ? (
            <>
              <div className="write-post">
                <Link to="/">새 글 작성</Link>
              </div>
              <Link to="/">
                <div className="header-profile" onClick={toggleProfilePopup}>
                  {userObj.photoURL ? (
                    <img src={userObj.photoURL} />
                  ) : (
                    <i class="fas fa-user"></i>
                  )}
                </div>
              </Link>
              {profilePopup ? (
                <div className="profile-popup">
                  <ProfilePopup userObj={userObj} />
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div class="login">
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
