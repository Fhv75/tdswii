import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import MusicCard from "../../components/MusicCard/MusicCard";

function Feed() {
  const navigate = useNavigate();

  function navigateToProfile() {
    navigate(`/user/${localStorage.getItem("username")}`);
  }

  // Los datos de "trackData" son simulados. En el futuro, estos datos serán obtenidos de la base de datos.

  const trackData = {
    id: "1",
    title: "LA cosa FUNCIONA SEÑORES",
    artist: "fbn",
    album: "Album 1",
    image: "https://picsum.photos/300/300",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    rating: 4.7
  }
  
  return (
    <>
    
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <Button
              variant="link"
              style={{ padding: 0 }}
              onClick={() => console.log("Image clicked")}
            >
              <Image
                src="/images/logomelorit.png"
                alt="Melorit Logo"
                width="30"
                height="30"
              />
            </Button>
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
                  <NavDropdown.Item >Action</NavDropdown.Item>
                  <NavDropdown.Item >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                    <Button onClick={() => navigate("/login")} variant="link">
                      Ir a Login
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Button onClick={() => navigate("/register")} variant="link">
                      Ir a Registro
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Button
                      onClick={() => navigate("/password-recovery")}
                      variant="link"
                    >
                      Ir a Recuperación de Contraseña
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Button
                      onClick={() => navigate("/contact-Form")}
                      variant="link"
                    >
                      Contacto
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
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
      <MusicCard track={trackData}/>
    </>
  );
}

export default Feed;
