import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'


function MusicCard () {

    return (
        <Card style={{ width: '40rem' }} >
            <Card.Body >
                <Container>
                    <Row >
                        <Col md={6}>
                            <Card>                 
                                <Card.Img src="/images/logomelorit.png" alt="Melorit Logo" />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h4>Artista</h4>
                            <h6>Titulo</h6>
                            <audio controls>
                                <source src="./music.mp3"/>
                            </audio> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Card style={{marginTop: '15px' }}>                 
                                <Card.Text>
                                    Etiquetas:
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      );
}

export default MusicCard