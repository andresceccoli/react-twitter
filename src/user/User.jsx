import React from "react";
import "./User.css";
import RoundImage from "react-rounded-image";

const User = ({ user }) => {
  return (
    <div className="user">
      <RoundImage image={user.picture} roundedSize="0" imageWidth="32" imageHeight="32"/>
      <span className="name">{user.name}</span>
      <span className="username">@{user.username}</span>
    </div>
  );
};

export default User;