import React from 'react'
import { useState } from 'react'
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap'
import { useToast } from '@chakra-ui/react'
import styles from './uploadAlbumForm.module.css'
import axios from 'axios'
import { useEffect } from 'react'


function UploadAlbumForm() {
    const toast = useToast()
    const [adminTracks, setAdminTracks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cover, setCover] = useState(null)
    const [albumData, setAlbumData] = useState(
        {
            "titulo": "",
            "artista": "",
            "tags": "",
            "precio": ""
        })
    const [selectedTracks, setSelectedTracks] = useState([])
    

    function inputHandler(e) {
        const { id, value } = e.target
        setAlbumData((prevData) => ({ ...prevData, [id]: value }))
    }

    function coverHandler(e) {
        const file = e.target.files[0]
        setCover(file)
    }

    async function submitHandler(e) {
        e.preventDefault()
        setIsLoading(true)
        await uploadFile()
        setIsLoading(false)
    }

    async function uploadFile() {
        const formData = new FormData()
        const tagsArray = albumData.tags.split(',').map((tag) => tag.trim())

        formData.append('image', cover)
        formData.append('titulo', albumData.titulo)
        formData.append('username', localStorage.getItem('username'))
        formData.append('artista', albumData.artista)
        formData.append('precio', albumData.precio)
        formData.append('tags', JSON.stringify(tagsArray))
        formData.append('pistas', JSON.stringify(selectedTracks))

        console.log(albumData)

        try {
            const username = localStorage.getItem('username');
            const response = await axios.post(
                `http://localhost:5000/audio/uploadAlbum/${albumData.titulo}-${username}`,
                formData,
                { headers: { 'x-access-token': localStorage.getItem('token') } }
            )
            console.log(response)
            toast({
                title: 'Álbum cargado exitosamente',
                status: 'success',
                colorScheme: 'green',
                duration: 2000,
            })
        } catch (error) {
            toast({
                title: 'Hubo un error al cargar el álbum',
                status: 'error',
                colorScheme: 'red',
                duration: 2000,
            })
            console.log(error)
        }
    }

    function onTrackCheck(event, trackTitle, trackID) {
        if (event.target.checked) {
            setSelectedTracks((prevTracks) => [...prevTracks, { titulo: trackTitle, id: trackID }])
        } else {
            setSelectedTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackID))
        }
        console.log(selectedTracks)
    }

    useEffect(() => {
        async function getAdminTracks() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/audio/getAdminTracks',
                    { headers: { 'x-access-token': localStorage.getItem('token') } }
                )
                setAdminTracks(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getAdminTracks()
    }, [])

    //TODO: Validar que el precio venta sea int

    return (
        <Form onSubmit={submitHandler} className="px-5 py-4">
            <Form.Group controlId="titulo" className="my-2">
                <Form.Label>Título del álbum</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={albumData.titulo}
                    required
                />
            </Form.Group>

            <Form.Group controlId="artista" className="my-2">
                <Form.Label>Artista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={albumData.artista}
                    required
                />
            </Form.Group>

            <Form.Group controlId="tags" className="my-2">
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control
                    type="text"
                    onChange={inputHandler}
                    value={albumData.tags}
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
                            value={albumData.precio}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="cover">
                        <Form.Label>Portada</Form.Label>
                        <Form.Control type="file" onChange={coverHandler}  accept=".png,.jpg,.jpeg,.webp" />
                    </Form.Group>
                </Col>
            </Row>
            <div className="mt-3">
                Selecciona las pistas que deseas agregar al álbum
            </div>
            <div className={`${styles['upload-album-form-tracks-container']} bg-white overflow-auto shadow-sm mb-4 mt-2 p-3`} >
                {
                    adminTracks.map((track, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center">
                            <Form.Check 
                                type="checkbox"
                                id={index}
                                label={track.titulo}
                                onChange={(event) => onTrackCheck(event, track.titulo, track.id)}
                            />
                        </div>
                    ))
                }
            </div>

            <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
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

export default UploadAlbumForm