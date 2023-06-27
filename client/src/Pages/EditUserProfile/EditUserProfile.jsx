import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditUserProfile() {

    const [updatedData, setUpdatedData] = useState({ username: "", biografia: "", ciudad: "" })
    const [updatedPw, setUpdatedPw] = useState({ password: "", confirmPw: "" })

    const navigate = useNavigate()

    function profileInputHandler(e) {
        const { id, value } = e.target
        setUpdatedData(prevData => ({ ...prevData, [id]: value }))
    }

    function passwordInputHandler(e) {
        const { id, value } = e.target
        setUpdatedPw(prevData => ({ ...prevData, [id]: value }))
    }

    async function profileSubmitHandler(e) {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/users/update-profile',
                {
                    token: localStorage.getItem('token'),
                    username: updatedData.username,
                    biografia: updatedData.biografia,
                    ciudad: updatedData.ciudad
                },
                { headers: { 'x-access-token': localStorage.getItem('token') } }
            )
            console.log(response)
            localStorage.setItem('username', updatedData.username)
            navigateToProfile()
        } catch (error) {
            console.log(error)
        }
    }

    async function passwordSubmitHandler(e) {
        e.preventDefault()
        try {
            const response = await axios.post(
                'http://localhost:5000/users/update-password',
                {
                    token: localStorage.getItem('token'),
                    password: updatedPw.password,
                },
                { headers: { 'x-access-token': localStorage.getItem('token') } }
            )
            console.log(response)
            navigateToProfile()
        } catch (error) {
            console.log(error)
        }
    }

    function navigateToProfile() {
        navigate(`/user/${localStorage.getItem('username')}`)
    }

    return (
        <div className="bg-white m-5 px-5 py-4">
            <h2 className="mb-4 pt-3">Editar Perfil</h2>
            <Form onSubmit={profileSubmitHandler}>
                <Row>
                    <Col>Nombre de Usuario</Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Control
                                type="username"
                                placeholder=""
                                onChange={profileInputHandler}
                                value={updatedData.username}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="ciudad">
                    <Row>
                        <Col>
                            <Form.Label>Ciudad</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={profileInputHandler}
                                value={updatedData.ciudad}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="biografia">
                    <Form.Label>Acerca de Mi</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder=""
                        rows={3}
                        onChange={profileInputHandler}
                        value={updatedData.biografia}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Actualizar
                </Button>
            </Form>
            <br />
            <Form onSubmit={passwordSubmitHandler}>
                <h3>Cambiar Contraseña</h3>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        onChange={passwordInputHandler}
                        value={updatedPw.password}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPw">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        onChange={passwordInputHandler}
                        value={updatedPw.confirmPw}
                        required
                    />
                    {
                        updatedPw.password !== updatedPw.confirmPw ?
                            (
                                <>
                                    <p className="text-danger">
                                        Las contraseñas no coinciden
                                    </p>
                                    <Button variant="primary" type="submit" className="mt-3" disabled>
                                        Actualizar
                                    </Button>
                                </>
                            ) :

                            <Button variant="primary" type="submit" className="mt-3">
                                Actualizar
                            </Button>
                    }
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={navigateToProfile}>
                Volver
            </Button>
        </div>
    )
}

export default EditUserProfile