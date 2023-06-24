import React, { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './login.module.css'
import { useToast } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  
  function inputHandler(e) {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    await loginUser();
  }

  async function loginUser() {
      setIsLoading(true);
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

          toast({
                title: 'Inicio de sesión exitoso',
                description: '¡Bienvenido/a!',
                status: 'success',
                colorScheme: 'green',
                duration: 2000,
          });
          
          setTimeout(() => {
            navigate(`../user/${response.data.username}`)
          }, 1000)
      } catch (error) {
          toast({
              title: 'Los datos ingresados son incorrectos.',
              status: 'error',
              colorScheme: 'red',
              duration: 2000,
          });
          console.log(error)
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <Container fluid className={styles['login-container'] + ' p-5 bg-white mt-5'}>
      <div className="text-center mb-4">
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
        <Button className="mb-3 w-100" variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" role="status" /> Cargando...
            </>
          ) : (
            'Ingresar'
          )}
        </Button>
      </Form>

      <div className="text-center text-secondary">
        <p>O</p>

        <Button
          className="mb-3 w-100"
          variant="dark"
          type="button"
          onClick={() => navigate('../register')}
        >
          Registrate
        </Button>

        <hr />

        <Button
          variant="link"
          type="button"
          onClick={() => navigate('../password-recovery')}
        >
          ¿Olvidaste tu Contraseña?
        </Button>
      </div>
    </Container>
  );
}

export default Login;