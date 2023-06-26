import React from 'react'
import { Table, Container, Row, Col, OverlayTrigger, Tooltip, Overlay } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlay, faComment } from '@fortawesome/free-solid-svg-icons'

function Ranking() {


    return (
        <div>
            <h1>Ranking de Usuarios</h1>
            <Container className="bg-white py-4 px-4 mt-4 mt-xl-5">
                <Row className="mx-5 pe-5">
                    <Col className="col-10 col-lg-8 col-md-7 col-sm-4">
                        Ordenar Por:
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faPlay} style={{ marginLeft: "10px", height: "32px" }} />
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faStar} style={{ height: "30px"}} /> 
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faComment} style={{ height: "32px" }} />
                    </Col>
                </Row>
                <hr />
                <Table striped className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Usuario</th>
                            <th>Reproducciones Totales</th>
                            <th>Valoraciones Promedio</th>
                            <th>Comentarios Totales</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Ranking