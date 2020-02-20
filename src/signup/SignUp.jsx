import React, { useState } from "react";
import "./SignUp.css";
import Button from "react-bootstrap/Button";

const SignUp = ({ externalUser, onComplete }) => {
  const [username, setUsername] = useState('');

  const onContinuar = () => {
    const user = {
      username: username,
      name: externalUser.profile.name,
      email: externalUser.profile.email,
      picture: externalUser.profile.profilePicURL
    };
    localStorage.setItem("loggedUser", JSON.stringify(user));
    onComplete(user);
  };

  return (
    <div className="signup">
      <div>
        <img src={externalUser.profile.profilePicURL} alt="user profile" />
      </div>
      <div className="handle">
        <p>Elegí tu nombre de usuario</p>
        <span>@</span>
        <input type="text" name="username" placeholder="usuario" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <p>{externalUser.profile.name}</p>
      <p>{externalUser.profile.email}</p>
      <div>
        <Button onClick={onContinuar}>Continuar</Button>
      </div>
    </div>
  );
};

export default SignUp;