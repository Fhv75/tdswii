import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ResetPw () {

    const [data, setData] = useState({})
    const { token } = useParams()

    function inputHandler(e) {
        if (e.target.id === "password") {
            setData({...data, password: e.target.value})
        } 
        else {
            setData({...data, confirmPw: e.target.value})
        }
    }

    async function submitHandler(e) {
        e.preventDefault()
        await resetPw()
    }

    async function resetPw() {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
        try {
            const response = await axios.post(
                `http://localhost:5000/users/reset-password/${token}`,
                { 
                    newPassword: data.password,
                }
            )
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Restablecer Contraseña</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control 
                        type="password" 
                        placeholder="Ingresa tu nueva Contraseña" 
                        onChange={inputHandler}
                        value={data.password}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Confirma tu nueva Contraseña" 
                        onChange={inputHandler}
                        value={data.confirmPw}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Confirmar
                </Button>
            </Form>
        </div>
    )
}

export default ResetPw
