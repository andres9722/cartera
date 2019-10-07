import React from "react";
import "./ProfileInfo.scss";

const avatar =
  "https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png";

const ProfileInfo = ({ photoURL, displayName, email }) => (
  <div className="profile">
    <img className="profile__avatar" src={avatar} alt="avatar" />
    <p className="profile__username">{displayName}</p>
    <p className="profile__email">{email}</p>
  </div>
);

export default ProfileInfo;
