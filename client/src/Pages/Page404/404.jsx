import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './404.module.css'
function Page404() {
    const navigate = useNavigate()

    return (
            <Container className="mx-auto mt-5 py-5 text-center w-50">
                <Row>
                    <Col>
                        <h1 className={styles.title}>404</h1>
                        <h2 className={styles.subtitle}>Página no encontrada</h2>
                        <Button className={styles.button} onClick={() => navigate('/')}>Volver al inicio</Button>
                    </Col>
                </Row>
            </Container>
    )
}

export default Page404