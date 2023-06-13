import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'
import styles from './dashboard.module.css'

function Dashboard() {
    return (
        <Row className="gx-0 min-vh-100 bg-white">
            <Col md={2}>
                <SideBar />
            </Col>
            <Col>
                <Container className={'py-4 px-5'}>
                    <h1>Dashboard</h1>
                </Container>
            </Col>
        </Row>
    )
}

export default Dashboard