import React, { useState, useCallback } from "react";
import "./SignUp.css";
import Button from "react-bootstrap/Button";
import { useDropzone } from "react-dropzone";
import * as firebase from 'firebase/app';
import "firebase/storage";
import Cropper from "react-easy-crop";
import Alert from "react-bootstrap/Alert";
import { signup, auth } from "../api";

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const SignUp = ({ externalUser, onComplete }) => {
  const [error, setError] = useState();

  const [username, setUsername] = useState('');

  const onContinuar = () => {
    if (username.trim().length === 0) {
      setError('Ingrese su nombre de usuario');
      return;
    }

    setError(undefined);

    const user = {
      username: username,
      name: externalUser.profile.name,
      email: externalUser.profile.email,
      picture: uploadedUrl || externalUser.profile.profilePicURL
    };

    signup(user)
      .then(res => {
        if (res.ok) {
          auth(user.email)
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                alert("Usuario incorrecto");
              }
            })
            .then(res => {
              localStorage.setItem("loggedUser", res.token);
              onComplete();
            })
            .catch(err => alert(err.message));
        } else {
          alert("Error al dar de alta el usuario");
        }
      })
      .catch(err => alert(err.message));
  };

  const [uploadedUrl, setUploadedUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  const onDrop = useCallback(acceptedFiles => {
    console.log('accepted files', acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // readFile(file).then(imageDataUrl => {
      //   setImageUrl(imageDataUrl);
      // });

      var rootRef = firebase.storage().ref();
      var fileRef = rootRef.child(file.name);
      fileRef.put(file).then(snapshot => {
        console.log('upload correcto', snapshot);
        setUploadedUrl(`https://firebasestorage.googleapis.com/v0/b/${snapshot.metadata.bucket}/o/${snapshot.metadata.name}?alt=media`);
      }).catch(err => {
        console.log('error al subir', err);
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="signup">
      <div>
        <img src={externalUser.profile.profilePicURL} alt="user profile" />

        <div {...getRootProps()}>
          <input {...getInputProps()}/>
          {
            isDragActive ?
              <p>Arrastrar archivos aqui</p> :
              <p>Arrastrar archivos aqui o hacer click para seleccionar</p>
          }
        </div>

        {imageUrl &&
          <div className="cropper">
            <Cropper 
              image={imageUrl}
            />
          </div>
        }

        {uploadedUrl && <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>}
      </div>
      <div className="handle">
        <p>Elegí tu nombre de usuario</p>
        <span>@</span>
        <input type="text" name="username" placeholder="usuario" value={username} onChange={e => setUsername(e.target.value)} />
        {error &&
          <Alert variant="danger">{error}</Alert>
        }
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