import React from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import styles from './uploadProduct.module.css'

function UploadProduct() {
    const [flag, setFlag] = useState(true)

    return (
        <div>
            <h1>Cargar Productos</h1>
            <Row className="mt-4 mt-xl-5">
                <Col>
                    <div className="bg-light me-xl-4 px-5 rounded shadow-sm">
                        {
                            flag ?
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
                                : 
                            <h1>Hola</h1>
                        }
                    </div>
                </Col>
                <Col 
                    xl={4} 
                >
                    <div 
                        style={{maxHeight: "min-content"}}
                        className="bg-light pb-2 mt-4 mt-xl-0 ms-xl-4 rounded shadow-sm"
                    >
                        <h4 className="ps-4 pt-4">Cargar:</h4>
                        <hr />
                        <div className="ms-4 my-3">
                            <Button 
                                variant={flag ? "dark" : "outline-dark"} 
                                className="mb-3"
                                onClick={() => {setFlag(true)}}
                            >
                                Single
                            </Button>
                            <br />
                            <Button 
                                variant={flag ? "outline-dark" : "dark"}
                                onClick={() => {setFlag(false)}}
                            >
                                Album
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UploadProduct