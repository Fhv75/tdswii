import React from 'react'
import { useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'


function UploadTrackProductForm() {
    const [files, setFiles] = useState({cover: null, audio: null});
    const [fileData, setFileData] = useState(
        {
            "titulo": "", 
            "artista": "", 
            "tags": "", 
            "precio": ""
        })
    
    function inputHandler(e) {
        const { id, value } = e.target;
        setFileData((prevData) => ({ ...prevData, [id]: value }));
    }

    function fileHandler(e, fileType) {
        const file = e.target.files[0];
        setFiles((prevFiles) => ({ ...prevFiles, [fileType]: file }));
    }

    async function submitHandler(e) {
        e.preventDefault()
        await uploadFile()
    }

    async function uploadFile() {
        const formData = new FormData();
        const tagsArray = fileData.tags.split(',').map((tag) => tag.trim());
    
        formData.append('audioFile', files.audio);
        formData.append('coverFile', files.cover);
        formData.append('titulo', fileData.titulo);
        formData.append('artist', fileData.artista);
        formData.append('token', localStorage.getItem('token'));
        formData.append('tags', JSON.stringify(tagsArray));
        
        try {
            const response = await axios.post(
                `http://localhost:5000/audio/upload/${fileData.titulo}-${localStorage.getItem('username')}`,
                formData,
                { headers: { 'x-access-token': localStorage.getItem('token') } }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    //TODO: Validar que el precio venta sea int
    //TODO: Manejar la carga de la pista
    //TODO: Manejar la carga de la portada

    return (
        <Form onSubmit={submitHandler} className="px-5 py-4">
            <Form.Group controlId="titulo" className="my-2">
                <Form.Label>Título de la pista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.titulo}
                />
            </Form.Group>

            <Form.Group controlId="artista" className="my-2">
                <Form.Label>Artista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.artista}
                />
            </Form.Group>

            <Form.Group controlId="audio" className="my-2">
                <Form.Label>Pista</Form.Label>
                <Form.Control type="file" onChange={(event) => fileHandler(event, "audio")} />
            </Form.Group>

            <Form.Group controlId="tags" className="my-2">
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.tags}
                    placeholder="Ej: rock, pop, jazz, etc. Separadas por comas"
                />
            </Form.Group>
            <Row className="my-2">
                <Col>
                    <Form.Group controlId="precio">
                        <Form.Label>Precio Venta</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={inputHandler}
                            value={fileData.precio}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="cover">
                        <Form.Label>Portada</Form.Label>
                        <Form.Control type="file" onChange={(event) => fileHandler(event, "cover")} />
                    </Form.Group>
                </Col>
            </Row>
        

            <Button variant="primary" type="submit" className="mt-3">
                Cargar
            </Button>
        </Form> 
    )
}

export default UploadTrackProductForm