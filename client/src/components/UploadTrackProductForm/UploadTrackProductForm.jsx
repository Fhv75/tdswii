import React from 'react'
import { useState } from 'react'
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'


function UploadTrackProductForm() {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        await uploadFile()
        setIsLoading(false)
    }

    async function uploadFile() {
        const formData = new FormData();
        const tagsArray = fileData.tags.split(',').map((tag) => tag.trim());
    
        formData.append('audio', files.audio);
        formData.append('image', files.cover);
        formData.append('titulo', fileData.titulo);
        formData.append('artist', fileData.artista);
        formData.append('precio', fileData.precio)
        formData.append('tags', JSON.stringify(tagsArray));
        formData.append('token', localStorage.getItem('token'));
        formData.append('username', localStorage.getItem('username'));
        
        try {
            const username = localStorage.getItem('username');
            const response = await axios.post(
                `http://localhost:5000/audio/upload/${fileData.titulo}-${username}`,
                formData,
                { 
                    headers: { 
                        'x-access-token': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    } 
                }
            );
            console.log(response);
            toast({
                title: 'Pista cargada exitosamente',
                status: 'success',
                colorScheme: 'green',
                duration: 2000,
            });
        } catch (error) {
            toast({
                title: 'Hubo un error al cargar la pista',
                status: 'error',
                colorScheme: 'red',
                duration: 2000,
            });
            console.log(error);
        }
    }

    //TODO: Validar que el precio venta sea int

    return (
        <Form onSubmit={submitHandler} className="px-5 py-4">
            <Form.Group controlId="titulo" className="my-2">
                <Form.Label>Título de la pista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.titulo}
                    required
                />
            </Form.Group>

            <Form.Group controlId="artista" className="my-2">
                <Form.Label>Artista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.artista}
                    required
                />
            </Form.Group>

            <Form.Group controlId="audio" className="my-2" >
                <Form.Label>Pista</Form.Label>
                <Form.Control type="file" onChange={(event) => fileHandler(event, "audio")} required accept=".mp3" />
            </Form.Group>

            <Form.Group controlId="tags" className="my-2">
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={fileData.tags}
                    placeholder="Ej: rock, pop, jazz, etc. Separadas por comas" 
                    required
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
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="cover">
                        <Form.Label>Portada</Form.Label>
                        <Form.Control type="file" onChange={(event) => fileHandler(event, "cover")} accept=".jpg" />
                    </Form.Group>
                </Col>
            </Row>
        

            <Button variant="primary" type="submit" className="mt-3">
                {
                    isLoading ? (
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    ) : (
                            <span>Cargar</span>
                        )
                }
            </Button>
        </Form> 
        
    )
}

export default UploadTrackProductForm