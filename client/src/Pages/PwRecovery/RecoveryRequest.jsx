import React, { useState } from 'react'
import { Alert, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './recoveryRequest.module.css'

function PwRecovery () {

    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    function inputHandler(e) {
        setEmail(e.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault()
        setIsSubmitted(true)
        await sendEmail()
    }

    async function sendEmail() {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
        try {
            const response = await axios.post(
                'http://localhost:5000/users/password-recovery',
                { 
                    email: email
                }, 
            )
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container fluid className={styles["recovery-container"] + " p-5 bg-white mt-5"}>
            <div className="text-center mb-5">
                <h1 className="px-sm-5">Recuperar Contraseña</h1>
                <hr />
                <p className="mt-4">Ingresa tu correo electrónico para recibir una nueva contraseña</p>
            </div>

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        onChange={inputHandler}
                        type="email"
                        placeholder="Ingresa tu Correo"
                        value={email}
                    />
                </Form.Group>

                

                <Button className="mt-4 mb-3 w-100" variant="primary" type="submit">Recuperar Contraseña</Button>

                {
                    isSubmitted && 
                    <Alert variant="info" className="mt-3">
                        Haz click en la URL que te enviamos a tu correo electrónico para restablecer tu contraseña.
                    </Alert>
                }
            </Form>
            <hr />
            <div className="text-center text-secondary">
                <Button
                    variant="link"
                    type="button"
                    onClick={() => navigate("../login")}
                >
                    Ir a Iniciar Sesión
                </Button>
                <br />
                <Button    
                    variant="link"
                    type="button"
                    onClick={() => navigate("../register")}
                    className="mt-2"
                >
                    Ir a Registro
                </Button>
            </div>
        </Container>
    )
}

export default PwRecovery
