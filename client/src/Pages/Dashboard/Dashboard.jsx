import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'
import styles from './dashboard.module.css'
import UploadProduct from '../UploadProduct/UploadProduct'

//TODO: Hacer que este componente solo sea accesible por administradores
//TODO: Arreglar el breakpoint entre la sidebar y el contenido

function Dashboard() {
    const [screen, setScreen] = useState("dashboard")
    
    return (
        <Row className={`${styles['dashboard-background']} gx-0 min-vh-100`}>
            <Col className="d-none d-sm-block" style={{maxWidth: "max-content"}}>
                <SideBar onScreenChange={setScreen}/>
            </Col>
            <Col>
                <Container className="py-4 py-xl-5">
                    {
                        screen === "dashboard" ? <h1>Dashboard</h1> : 
                        screen === "uploadProducts" ? <UploadProduct/> : 
                        screen === "trackApproval" ? <h1>Track Approval</h1> :
                        screen === "ranking" ? <h1>Ranking</h1> : null
                    }
                </Container>
            </Col>
        </Row>
    )
}

export default Dashboard