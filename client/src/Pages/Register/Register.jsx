import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [data, setData] = useState({email: "", username: "", password: "", confirmPw: ""})
    const navigate = useNavigate()

    function inputHandler(e) {
        const { id, value } = e.target
        setData(prevData => ({ ...prevData, [id]: value}))
    }

    async function submitHandler(e) {
        e.preventDefault()
        await registerUser()
    }

    async function registerUser() {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
        try {
            
            const response = await axios.post(
                'http://localhost:5000/users/register',
                { 
                    correo: data.email, 
                    username: data.username,
                    password: data.password 
                }, 
            )
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            navigate(`/complete-profile`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Registro</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="Ingresa tu Nombre de Usuario" 
                        onChange={inputHandler}
                        value={data.username}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Ingresa tu Correo" 
                        onChange={inputHandler}
                        value={data.email}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={inputHandler}
                        value={data.password}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="confirmPw">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={inputHandler}
                        value={data.confirmPw}
                        required
                    />
                    {
                        data.password !== data.confirmPw && 
                            <p className="text-danger">
                                Las contraseñas no coinciden
                            </p>
                    }
                </Form.Group>
                {
                    data.password !== data.confirmPw ?
                        <Button variant="primary" type="submit" disabled>
                            Registrarse
                        </Button>
                    :
                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                }
                
            </Form>
        </div>
    )
}

export default Register