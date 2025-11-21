import React from "react";
import "./ProfileCard.css";

function ProfileCard({ name, bio, avatar, isFollowed, onFollowToggle }) {
  return (
    <div className="profile-card">
      <img className="profile-avatar" src={avatar} alt={name} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-bio">{bio}</p>
      <button
        className={`profile-follow-btn ${isFollowed ? "unfollow" : "follow"}`}
        onClick={onFollowToggle}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default ProfileCard;
