import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import styles from './uploadProduct.module.css'
import UploadTrackProductForm from '../../components/UploadTrackProductForm/UploadTrackProductForm'
import UploadAlbumForm from '../../components/UploadAlbumForm/UploadAlbumForm'
import axios from 'axios'

function UploadProduct() {
    const [flag, setFlag] = useState(true)

    return (
        <div>
            <h1>Cargar Productos</h1>
            <Row className="mt-4 mt-xl-5">
                <Col xl={8} >
                    <div className="bg-light me-xl-4 px-5 rounded shadow-sm">
                        {
                            flag ?
                                <UploadTrackProductForm />
                                    : 
                                <UploadAlbumForm />
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