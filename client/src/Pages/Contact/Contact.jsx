import React from 'react'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import styles from './contact.module.css'


function ContactForm () {
	const [data, setData] = useState({name: "", email: "", message: ""})
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	function inputHandler(event) {
		const { id, value } = event.target
		setData(prevData => ({ ...prevData, [id]: value}))
	}

	async function submitHandler (event) {
		event.preventDefault();		
		setName('');
		setEmail('');
		setMessage('');
		await sendData();
	};

	async function sendData() {
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
		try {
			const response = await axios.post(
				`http://localhost:5000/users/contact`,
				{ 
					name: data.name,
					mail: data.email,
					message: data.message
				}
			)
			console.log(response)

		} catch (error) {   
			console.log(error)
		}
	}

	return (
		<Container fluid className={styles["contact-container"] + " p-5 bg-white mt-5"}>
			<div className="text-center mb-3">
				<h1 className="px-sm-5">Contacto</h1>
				<hr />
			</div>

			<Form onSubmit={submitHandler}>
				<Form.Group className="pt-3 mb-2" controlId="name">
					<Form.Label>Nombre</Form.Label>
					<Form.Control
						onChange={inputHandler}
						placeholder="Ingresa tu Nombre"
						value={data.name}
						required
					/>
				</Form.Group>

				<Form.Group className="pt-3 mb-4" controlId="email">
					<Form.Label>Correo Electrónico</Form.Label>
					<Form.Control
						onChange={inputHandler}
						type="email"
						placeholder="Ingresa tu Correo"
						value={data.email}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-5" controlId="message">
					<Form.Label>Mensaje</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Tu mensaje"
						onChange={inputHandler}
						value={data.message}
						required
					/>
				</Form.Group>

				<Button className="mb-3 w-100" variant="primary" type="submit">Enviar</Button>
			</Form>
		</Container>
	);
};

export default ContactForm;
