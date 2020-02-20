import React from "react";
import TweetItem from "../tweet/TweetItem";

const sample = [
  {
    id: 1,
    user: {
      username: "andres",
      name: "Andres Ceccoli",
      picture: "https://lh3.googleusercontent.com/a-/AAuE7mCrn2DwWfUwFdkmWgCRqdZ0F55Qo2W00UKoBGXv=s96-c"
    },
    text: "Aca twiteando",
    date: 1581852935
  },
  {
    id: 2,
    user: {
      username: "andres",
      name: "Andres Ceccoli",
      picture: "https://lh3.googleusercontent.com/a-/AAuE7mCrn2DwWfUwFdkmWgCRqdZ0F55Qo2W00UKoBGXv=s96-c"
    },
    text: "Hola twitter!",
    date: 1581535320
  }
];

const HomeFeed = () => {
  return sample.map(t => <TweetItem key={t.id} value={t}/>);
};

export default HomeFeed;