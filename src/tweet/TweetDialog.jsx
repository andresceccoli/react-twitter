import React, { useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { newTweet } from "../api";

const TweetDialog = ({ show, handleClose, handleNew }) => {
  const [text, setText] = useState('');

  const textChange = useCallback(e => setText(e.target.value), []);

  const onEnviar = useCallback(() => {
    if (text.trim().length === 0) return;
    newTweet(text)
      .then(res => {
        if (res.ok) {
          setText('');
          handleNew();
        } else alert(`Error: ${res.text}`);
      })
      .catch(err => alert(err.message));
  }, [text, handleNew]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="textarea" value={text} onChange={textChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onEnviar}>Enviar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TweetDialog;