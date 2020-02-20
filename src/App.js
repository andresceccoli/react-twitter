import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SocialButton from './SocialButton';
import { GOOGLE_SIGNIN_ID } from './keys';
import * as firebase from 'firebase/app';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './signup/SignUp';
import HomeFeed from './feed/HomeFeed';

function App() {
  const [user, setUser] = useState();

  const handleLoginSuccess = (user) => {
    console.log(user);
    setUser(user);
  };
  const handleLoginFailure = (err) => {
    alert(err);
    console.log(err);
  };

  const [existingUser, setExistingUser] = useState();
  useEffect(() => {
    const u = localStorage.getItem("loggedUser");
    if (u)
      setExistingUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAZnugoXVubREbc7ssLUnjld8HLVg0W5p8",
      authDomain: "react-twitter-1581996948109.firebaseapp.com",
      databaseURL: "https://react-twitter-1581996948109.firebaseio.com",
      projectId: "react-twitter-1581996948109",
      storageBucket: "react-twitter-1581996948109.appspot.com",
      messagingSenderId: "863639600306",
      appId: "1:863639600306:web:738e100dd2c0ae489a9dab"
    };
    firebase.initializeApp(firebaseConfig);
    console.log('firebase initialized');
  }, []);

console.log("eu", existingUser)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {existingUser != null 
            ? <HomeFeed /> :
            <div className="App">
              <header className="App-header">
                {!user &&
                  <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>React Twitter</p>
                    <p>
                      <SocialButton
                        provider="google"
                        appId={GOOGLE_SIGNIN_ID}
                        onLoginSuccess={handleLoginSuccess}
                        onLoginFailure={handleLoginFailure}>
                        Login con Google
                      </SocialButton>
                    </p>
                  </div>
                }
                {user && <SignUp externalUser={user} onComplete={u => setExistingUser(user)}/>}
              </header>
            </div>
          }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
