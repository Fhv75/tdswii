import React from 'react'
import { useEffect, useState } from 'react'
import { Table, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPlay, faComment } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Ranking() {
    const [userData, setUserData] = useState([])

    function orderByReproducciones() {
        const sortedData = [...userData].sort((a, b) => b.total_reproducciones - a.total_reproducciones)
        setUserData(sortedData)
    }

    function orderByValoraciones() {
        const sortedData = [...userData].sort((a, b) => b.promedio_total - a.promedio_total)
        setUserData(sortedData)
    }

    function orderByComentarios() {
        const sortedData = [...userData].sort((a, b) => b.total_comentarios - a.total_comentarios)
        setUserData(sortedData)
    }

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/users/getUserStats',
                    { headers: { 'x-access-token': localStorage.getItem('token') } }
                )
                setUserData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])

    return (
        <div>
            <h1>Ranking de Usuarios</h1>
            <Container className="bg-white py-4 px-4 mt-4 mt-xl-5">
                <Row className="mx-5 pe-5">
                    <Col className="col-10 col-lg-8 col-md-7 col-sm-4">
                        Ordenar Por:
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faPlay} style={{ marginLeft: "10px", height: "32px", cursor: "pointer" }} onClick={orderByReproducciones} />
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faStar} style={{ height: "30px", cursor: "pointer" }} onClick={orderByValoraciones} />
                    </Col>
                    <Col>
                        <FontAwesomeIcon icon={faComment} style={{ height: "32px", cursor: "pointer" }} onClick={orderByComentarios} />
                    </Col>
                </Row>
                <hr />
                <Table striped className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Correo Electrónico</th>
                            <th>Usuario</th>
                            <th>Reproducciones Totales</th>
                            <th>Valoraciones Promedio</th>
                            <th>Comentarios Totales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.correo}</td>
                                        <td>{user.username}</td>
                                        <td>{user.total_reproducciones}</td>
                                        <td>{user.promedio_total}</td>
                                        <td>{user.total_comentarios}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Ranking