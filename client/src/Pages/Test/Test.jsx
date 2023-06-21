import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';

function UploadAudioFile() {
    // react-bootstrap form to upload an image and an mp3 file
    const [files, setFiles] = 
    function fileHandler() {

    }

    return (
      <Container>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload an image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
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

