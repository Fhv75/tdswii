import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'
import styles from './dashboard.module.css'
import UploadProduct from '../UploadProduct/UploadProduct'

function Dashboard() {
    const [path, setPath] = useState("/dashboard")
    
    return (
        <Row className="gx-0 min-vh-100 bg-white">
            <Col style={{maxWidth: "max-content"}}>
                <SideBar onScreenChange={setPath}/>
            </Col>
            <Col>
                <Container className="py-4 px-5">
                    {
                        path === "/dashboard" ? <h1>Dashboard</h1> : 
                        path === "/upload-products" ? <UploadProduct/> : 
                        path === "/track-approval" ? <h1>Track Approval</h1> :
                        path === "/ranking" ? <h1>Ranking</h1> : null
                    }
                </Container>
            </Col>
        </Row>
    )
}

export default Dashboard