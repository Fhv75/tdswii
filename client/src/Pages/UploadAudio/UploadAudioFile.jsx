import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';
import './UploadAudioFile.css';

function UploadAudioFile() {
  const [fileData, setFileData] = useState({ titulo: '', tags: '' });
  const [file, setFile] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  function inputHandler(e) {
    const { id, value } = e.target;
    setFileData((prevData) => ({ ...prevData, [id]: value }));
  }

  function fileHandler(e) {
    setFile(e.target.files[0]);
  }

  async function submitHandler(e) {
    e.preventDefault();
    await uploadFile();
  }

  async function uploadFile() {
    const formData = new FormData();
    const tagsArray = fileData.tags.split(',').map((tag) => tag.trim());

    formData.append('audioFile', file);
    formData.append('titulo', fileData.titulo);
    formData.append('token', localStorage.getItem('token'));
    formData.append('tags', JSON.stringify(tagsArray));
    try {
      const response = await axios.post(
        `http://localhost:5000/audio/upload/${fileData.titulo}-${localStorage.getItem('username')}`,
        formData,
        { headers: { 'x-access-token': localStorage.getItem('token') } }
      );
      setToastVariant('success');
      setToastMessage('¡La pista se cargó exitosamente!');
      setShowToast(true);
      console.log(response);
      setFormSubmitted(true); 
    } catch (error) {
      setToastVariant('danger');
      setToastMessage('Hubo un error al cargar la pista.');
      setShowToast(true);
      console.log(error);
    }
  }

  function resetForm() {
    setFormSubmitted(false);
    setFileData({ titulo: '', tags: '' });
    setFile('');
  }

  if (formSubmitted) {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <div>¡La pista se cargó exitosamente!</div> 
            <Button variant="primary" onClick={resetForm}>
              Cargar otra pista
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Pista</Form.Label>
              <Form.Control type="file" onChange={fileHandler} />
            </Form.Group>

            <Form.Group controlId="titulo">
              <Form.Label>Título de la pista</Form.Label>
              <Form.Control
                type="text"
                onChange={inputHandler}
                value={fileData.titulo}
              />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>
		Etiquetas</Form.Label>
	<Form.Control
type="text"
onChange={inputHandler}
value={fileData.tags}
placeholder="Ej: rock, pop, jazz, etc. Separadas por comas"
/>
</Form.Group>
 <Button variant="primary" type="submit">
          Subir
        </Button>
      </Form>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className={`mt-3 bg-${toastVariant}`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Col>
  </Row>
</Container>
);
}

export default UploadAudioFile;

