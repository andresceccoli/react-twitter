import React from "react";
import "./User.css";

const UserHeader = ({user}) => {
  return (
    <div className="user-header">
      <span className="name">{user.name}</span>
      <span className="username">@{user.username}</span>
    </div>
  );
};

export default UserHeader;