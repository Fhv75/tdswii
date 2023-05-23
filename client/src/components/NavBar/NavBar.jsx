import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function navigateToProfile() {
    navigate(`/user/${localStorage.getItem("username")}`);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
            <Image
              src="/images/logomelorit.png"
              alt="Melorit Logo"
              width="30"
              height="30"
            />
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          <Form className="d-flex ms-auto align-items-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-4 ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div>
              <NavDropdown align="end" title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="">Action</NavDropdown.Item>
                <NavDropdown.Item href="">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="">
                  <Button onClick={() => navigate("/login")} variant="link">
                    Ir a Login
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  <Button onClick={() => navigate("/register")} variant="link">
                    Ir a Registro
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  <Button
                    onClick={() => navigate("/password-recovery")}
                    variant="link"
                  >
                    Ir a Recuperación de Contraseña
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  <Button
                    onClick={() => navigate("/contact-Form")}
                    variant="link"
                  >
                    Contacto
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  {localStorage.getItem("token") && (
                    <Button onClick={navigateToProfile} variant="link">
                      Ir a perfil
                    </Button>
                  )}
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
