import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function SideBar() {
    return (
        <Navbar bg="light" expand="lg" className="flex-column h-100">
            <Navbar.Brand>Dashboard Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="sidebar-nav" />
            <Navbar.Collapse id="sidebar-nav">
                <Nav className="flex-column">
                    <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#user-requests">User Requests</Nav.Link>
                    <Nav.Link href="#notifications">Notifications</Nav.Link>
                    <Nav.Link href="#analytics">Analytics</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                    <Nav.Link href="#help">Help/Support</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav.Link href="#logout" className="mt-auto">Logout</Nav.Link>
        </Navbar>
    );
}

export default SideBar