import React from "react";
import TweetItem from "../tweet/TweetItem";

const HomeFeed = ({ tweets }) => {
  return tweets.map(t => <TweetItem key={t.id} value={t}/>);
};

export default HomeFeed;