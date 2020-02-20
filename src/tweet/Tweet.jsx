import React from "react";
import User from "../user/User";
import "./Tweet.css";

const Tweet = ({value}) => {
  return (
    <div className="tweet">
      <User user={value.user}/>
      {value.text}
    </div>
  );
};

export default Tweet;