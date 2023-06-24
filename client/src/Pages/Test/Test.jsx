import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';

function UploadAudioFile() {
    // react-bootstrap form to upload an image and an mp3 file
    const [files, setFiles] = useState({image: null, audio: null})

    function fileHandler(event, fileType) {
        const file = event.target.files[0]
        setFiles(prevFiles => ({...prevFiles, [fileType]: file}))
    }

  async function getTest() {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
    const formData = new FormData();

    formData.append('image', files.image)
    // no puedo mandar 2 archivos en el mismo form data :s
    formData.append('audio', files.audio)
    try {
      const response = await axios.post(
        'http://localhost:5000/audio/test',
        formData,
      )
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    await getTest()
  }

    console.log(files)
    return (
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group 
            controlId="formFile" 
            className="mb-3" 
            onChange={(event) => {fileHandler(event, 'image')}}
          >
            <Form.Label>Upload an image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group 
            controlId="formFile" 
            className="mb-3" 
            onChange={(event) => { fileHandler(event, 'audio') }}
          >
            <Form.Label>Upload an mp3 file</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
}

export default UploadAudioFile;

