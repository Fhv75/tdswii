import React from 'react'
import { Navbar, Nav, Image, Button, Row, Col } from 'react-bootstrap';
import styles from './sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faRecordVinyl, faListCheck, faRankingStar } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/js/bootstrap.bundle.js'

function SideBar({onScreenChange}) {
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
                <Button variant="dark" className="mt-auto mb-5 d-flex">
                    <Col className="mx-auto my-auto" style={{ maxWidth: "max-content" }}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Col>
                    <Col className="content collapse collapse-horizontal ms-3">
                        Cerrar Sesión
                    </Col>
                    
                </Button>
        </Navbar>
    );
}

export default SideBar