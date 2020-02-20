import React from "react";
import "./Tweet.css";
import RoundImage from "react-rounded-image";
import UserHeader from "../user/UserHeader";
import moment from "moment";

const TweetItem = ({value}) => {
  return (
    <div className="tweet-item">
      <RoundImage image={value.user.picture} imageWidth="32" imageHeight="32" roundedSize="0"/>
      <div className="content">
        <div className="header">
          <UserHeader user={value.user}/>
          <span className="date">
            {moment.unix(value.date).fromNow()}
          </span>
        </div>
        {value.text}
      </div>
    </div>
  );
};

export default TweetItem;