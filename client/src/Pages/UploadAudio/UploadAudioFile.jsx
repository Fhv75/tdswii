import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

function UploadAudioFile () {

    const [fileData, setFileData] = useState({titulo: "", tags: ""})
    const [file, setFile] = useState("")

    function inputHandler(e) {
        const { id, value } = e.target
        setFileData(prevData => ({ ...prevData, [id]: value}))
    }

    function fileHandler(e) {
        setFile(e.target.files[0])
        console.log(file.name)
    }

    async function submitHandler(e) {
        e.preventDefault()
        await uploadFile()
    }

    async function uploadFile() {
        const formData = new FormData()
        const tagsArray = fileData.tags.split(',').map(tag => tag.trim())
        console.log(tagsArray)

        formData.append('audioFile', file)
        formData.append('titulo', fileData.titulo)
        formData.append('token', localStorage.getItem('token'))
        formData.append('tags', JSON.stringify(tagsArray))
        try {
            const response = await axios.post(
                `http://localhost:5000/audio/upload/${fileData.titulo}`,
                formData,
                { headers: { 'x-access-token': localStorage.getItem('token') } }
            )
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }   


    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Pista</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={fileHandler}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Titulo de la pista</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={inputHandler}
                        value={fileData.titulo}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>Etiquetas</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={inputHandler}
                        value={fileData.tags}
                        placeholder="Ej: rock, pop, jazz, etc. Separadas por comas"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Subir</Button>
            </Form>
            
        </div>
    )   
}

export default UploadAudioFile