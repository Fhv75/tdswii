import React from 'react'
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import styles from './sidebar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function SideBar({onScreenChange}) {
    return (
        <Navbar bg="light" className={`${styles["sidebar"]} flex-column h-100 px-4`}>
            <Navbar.Brand className="me-0">
                <Image
                    src="/images/logomelorit.png"
                    alt="Melorit Logo"
                    width="50"
                    height="50"
                    onClick={() => console.log("hello")}
                    className={`${styles["brand-icon"]}`}
                />
            </Navbar.Brand>
            <Nav className={`${styles["links"]} flex-column mt-4`}>
                <Nav.Link onClick={() => onScreenChange('/upload-products')} className="mb-3">Cargar Productos</Nav.Link>
                <Nav.Link onClick={() => onScreenChange('/track-approval')} className="mb-3">Aprobación de Pistas</Nav.Link>
                <Nav.Link onClick={() => onScreenChange('/ranking')} className="mb-3">Ranking de Usuarios</Nav.Link>
            </Nav>
            <Button href="/logout" variant="dark" className="mt-auto mb-5">
                Cerrar Sesión
                <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
        </Navbar>
    );
}

export default SideBar