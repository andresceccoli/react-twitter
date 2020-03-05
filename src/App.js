import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SocialButton from './SocialButton';
import { GOOGLE_SIGNIN_ID } from './keys';
import * as firebase from 'firebase/app';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './signup/SignUp';
import { userCheck, auth } from './api';
import { Suspense } from 'react';
const Home = React.lazy(() => import('./home/Home'));

function App() {
  const [user, setUser] = useState();

  const handleLoginSuccess = (user) => {
    console.log(user);

    userCheck(user.profile.email)
      .then(res => {
        if (res.ok) {
          // usuario existe
          auth(user.profile.email)
            .then(res => res.json())
            .then(res => {
              localStorage.setItem("loggedUser", res.token);
              setLoginOk(true);
            })
        } else {
          // usuario nuevo
          setUser(user);
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };
  const handleLoginFailure = (err) => {
    alert(err);
    console.log(err);
  };

  const [loginOk, setLoginOk] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("loggedUser");
    if (token) setLoginOk(true);
    console.log('login ok');
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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loginOk ? (
            <Suspense fallback={<div>Cargando...</div>}>
              <Home />
            </Suspense>
            ) :
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
                {user && <SignUp externalUser={user} onComplete={() => setLoginOk(true)}/>}
              </header>
            </div>
          }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
