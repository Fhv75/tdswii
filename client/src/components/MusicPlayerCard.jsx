import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'

function MusicPlayerCard ({track, rating}) {

    return (
        <Card style={{ width: '35rem' }} >
            <Card.Body >
                <Container>
                    <Row >
                        <Col md={6}>
                            <Card>                 
                                <Card.Img src="/images/logomelorit.png" alt="Melorit Logo" />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h4>Titulo</h4>
                            <h6>Artista</h6>
                            <audio controls>
                                <source src="./music.mp3"/>
                            </audio> 
                            <p>Rating: {rating}</p> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Card style={{marginTop: '20px' }}>                 
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

export default MusicPlayerCard
