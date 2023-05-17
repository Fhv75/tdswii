import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [data, setData] = useState({email: "", password: ""})
    const navigate = useNavigate()

    function inputHandler(e) {
        const { id, value } = e.target
        setData(prevData => ({ ...prevData, [id]: value}))
    }

    async function submitHandler(e) {
        e.preventDefault()
        await loginUser()
    }

    async function loginUser() {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
        try {
            const response = await axios.post(
                'http://localhost:5000/users/login',
                { 
                    correo: data.email, 
                    password: data.password 
                }, 
            )
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            navigate(`../user/${response.data.username}`)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Ingresa tu Correo" 
                        onChange={inputHandler}
                        value={data.email}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={inputHandler}
                        value={data.pw}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}

export default Login