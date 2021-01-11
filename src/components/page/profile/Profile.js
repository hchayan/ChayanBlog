import ProfilePopup from "components/popup/ProfilePopup";
import React from "react";

const Profile = ({ userObj, articles, bookmarks }) => {
  return (
    <div className="profile">
      <ProfilePopup
        userObj={userObj}
        articles={articles}
        bookmarks={bookmarks}
      />
    </div>
  );
};

export default Profile;
