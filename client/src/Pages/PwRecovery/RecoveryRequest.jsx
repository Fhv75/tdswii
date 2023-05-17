import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import axios from 'axios'

function PwRecovery () {

    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

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
        <div>
            <h1>Restablecer Contraseña</h1>
            <p>Ingresa tu correo electrónico para recibir una nueva contraseña</p>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Ingresa tu Correo" 
                        onChange={inputHandler}
                        value={email}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Recuperar Contraseña
                </Button>

                {isSubmitted && <Alert variant="info" className="mt-3">
                    Haz click en la URL que te enviamos a tu correo electrónico para restablecer tu contraseña.
                </Alert>}
            </Form>
        </div>
    )
}

export default PwRecovery
