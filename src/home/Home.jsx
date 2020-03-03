import React, { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import HomeFeed from "../feed/HomeFeed";
import TweetDialog from "../tweet/TweetDialog";
import jwt from "jsonwebtoken";
import { loadUserTweets } from "../api";
import './Home.css';

const Home = () => {
  const [newTweet, setNewTweet] = useState(false);

  const onNewTweet = useCallback(() => setNewTweet(true), []);
  const handleClose = useCallback(() => setNewTweet(false), []);

  const load = useCallback(() => {
    const tokenStr = localStorage.getItem("loggedUser");
    const token = jwt.decode(tokenStr);
    loadUserTweets(token.username).then(res => res.json()).then(res => {
      setResponse(res);
    });
  }, []);

  const handleNew = useCallback(() => {
    setNewTweet(false);
    load();
  }, [load]);

  const [response, setResponse] = useState();
  useEffect(load, []);

  return (
    <div id="home">
      <div className="home-feed">
        <HomeFeed tweets={(response && response.data) || []} />
      </div>
      <Button onClick={onNewTweet}>Twittear</Button>
      <TweetDialog show={newTweet} handleClose={handleClose} handleNew={handleNew} />
    </div>
  );
};

export default Home;