import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './login.module.css'

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
        <Container fluid className={styles["login-container"] + " p-5 bg-white mt-5"}>
            <div className="text-center mb-5">
                <h1 className="px-sm-5">Iniciar Sesión</h1>
                <hr />
            </div>

            <Form onSubmit={submitHandler}>
                <Form.Group className="pt-3 mb-4" controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        onChange={inputHandler}  
                        type="email" 
                        placeholder="Ingresa tu Correo" 
                        value={data.email}
                    />
                </Form.Group>

                <Form.Group className="mb-5" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        onChange={inputHandler}
                        value={data.password}
                    />
                </Form.Group>

                <Button className="mb-3 w-100" variant="primary" type="submit">Ingresar</Button>
            </Form>

            <div className="text-center text-secondary">
                <p>O</p>

                <Button 
                    className="mb-3 w-100" 
                    variant="dark" 
                    type="button" 
                    onClick={() => navigate("../register")}
                >
                    Registrate
                </Button>

                <hr />

                <Button 
                    variant="link" 
                    type="button" 
                    onClick={() => navigate("../password-recovery")}
                >
                    ¿Olvidaste tu Contraseña?
                </Button>

            </div>
        </Container>
    )
}

export default Login