import React from 'react'
import { Navbar, Nav, Image, Button, Col } from 'react-bootstrap';
import styles from './sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faRecordVinyl, faListCheck, faRankingStar, faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function SideBar({ onScreenChange }) {
    const navigate = useNavigate()

    return (
        <Navbar bg="light" className={`${styles["sidebar"]} flex-column h-100 px-4 affix`}>
            <Navbar.Brand className="mx-0 mb-4 d-flex" data-bs-toggle="collapse" data-bs-target=".content" aria-expanded="false" aria-controls="content">
                <Image
                    src="/images/logomelorit.png"
                    alt="Melorit Logo"
                    width="60"
                    height="60"
                    className={`${styles["brand-icon"]}`}
                />
            </Navbar.Brand>
            <Nav className={`${styles["links"]} flex-column mt-4`}>
                <Nav.Link onClick={() => onScreenChange('uploadProducts')} className="my-3 d-flex text-start">
                    <Col className="mx-auto my-auto" style={{ maxWidth: "max-content" }}>
                        <FontAwesomeIcon icon={faRecordVinyl} size="2xl" />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3 ps-3">
                        Cargar Productos
                    </Col>
                </Nav.Link>
                <Nav.Link onClick={() => onScreenChange('trackApproval')} className="my-3 d-flex">
                    <Col className="mx-auto my-auto" style={{ maxWidth: "max-content" }}>
                        <FontAwesomeIcon icon={faListCheck} size="2xl" />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3 ps-3">
                        Aprobación de Pistas
                    </Col>
                </Nav.Link>
                <Nav.Link onClick={() => onScreenChange('ranking')} className="my-3 d-flex">
                    <Col className="mx-auto my-auto" style={{ maxWidth: "32px" }}>
                        <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3 ps-3">
                        Ranking de Usuarios
                    </Col>
                </Nav.Link>
                
            </Nav>
            <div className="mt-auto">
                <Button variant="secondary" className="mb-4 d-flex w-100" onClick={() => {
                    navigate('/')
                }}>
                    <Col className="mx-auto mt-auto" style={{ maxWidth: "max-content" }}>
                        <FontAwesomeIcon icon={faHome} />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3">
                        Volver al Inicio
                    </Col>

                </Button>
                <Button variant="dark" className="mb-5 d-flex w-100" onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    navigate('/')
                }}>
                    <Col className="mx-auto my-auto" style={{ maxWidth: "max-content" }}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3">
                        Cerrar Sesión
                    </Col>

                </Button>
            </div>
        </Navbar>
    );
}

export default SideBar