import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'

function UploadAlbumForm() {
    return(
        <Form onSubmit={()=>{}} className="px-5 py-4">
            <Form.Group controlId="titulo" className="my-2">
                <Form.Label>Título de la pista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={()=>{}}
                    value={"fileData.titulo"}
                />
            </Form.Group>
            <Form.Group controlId="artista" className="my-2">
                <Form.Label>Artista</Form.Label>
                <Form.Control
                    type="text"
                    onChange={()=>{}}
                    value={"fileData.artista"}
                />
            </Form.Group>

            <Form.Group controlId="track" className="my-2">
                <Form.Label>Pista</Form.Label>
                <Form.Control type="file" onChange={()=>{}} />
            </Form.Group>

            <Form.Group controlId="tags" className="my-2">
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control
                    type="text"
                    onChange={()=>{}}
                    value={"fileData.tags"}
                    placeholder="Ej: rock, pop, jazz, etc. Separadas por comas"
                />
            </Form.Group>
            <Row className="my-2">
                <Col>
                    <Form.Group controlId="precio">
                        <Form.Label>Precio Venta</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={()=>{}}
                            value={"fileData.precio"}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="cover">
                        <Form.Label>Portada</Form.Label>
                        <Form.Control type="file" onChange={()=>{}} />
                    </Form.Group>
                </Col>
            </Row>
        

            <Button variant="primary" type="submit" className="mt-3">
                Cargar
            </Button>
        </Form> 
    )
}

export default UploadAlbumForm