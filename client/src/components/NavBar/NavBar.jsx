import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import SearchBar from "../SearchBar/SearchBar"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Image } from "react-bootstrap"
import NavDropdown from "react-bootstrap/NavDropdown"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"


function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [flag, setFlag] = useState(false)

  function navigateToProfile() {
    navigate(`/user/${localStorage.getItem("username")}`)
  }
  useEffect(() => {
    async function isAdmin() {
      try {
        await axios.post(
          'http://localhost:5000/users/isAdmin',
          { token: localStorage.getItem("token") },
          { headers: { 'x-access-token': localStorage.getItem("token") } }
        )
        setFlag(true)
      } catch (error) {
        console.log(error)
        if (error.status !== 200)
          navigate('/')
      }
    }
    isAdmin()
  }, [])

  return (
    <Navbar bg="light" expand="lg" className={location.pathname == "/dashboard" && "d-none"}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image
            src="/images/logomelorit.png"
            alt="Melorit Logo"
            width="50"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <SearchBar />
          <Nav
            className="me-4 ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div>
              <NavDropdown
                align="end"
                title="Link"
                id="navbarScrollingDropdown"
              >
                {
                  flag && (
                    <NavDropdown.Item href="">
                      <Button onClick={() => navigate("/dashboard")} variant="link">
                        Dashboard
                      </Button>
                    </NavDropdown.Item>
                  )
                  
                }
                  <NavDropdown.Item href="">
                    <Button onClick={() => navigate("/upload")} variant="link">
                      Cargar
                    </Button>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                {
                  !localStorage.getItem("token") && (
                    <div>
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
                    </div>
                  )
                }
                {
                  localStorage.getItem("token") && (
                    <div>
                      <NavDropdown.Item href="">
                        <Button onClick={navigateToProfile} variant="link">
                          Ir a perfil
                        </Button>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="">
                        <Button onClick={() => {
                          localStorage.removeItem('token')
                          localStorage.removeItem('username')
                          navigate('/')
                        }} variant="link">
                          Cerrar Sesión
                        </Button>
                      </NavDropdown.Item>
                    </div>
                  )
                }
                <NavDropdown.Item href="">
                  <Button
                    onClick={() => navigate("/contact-Form")}
                    variant="link"
                  >
                    Contacto
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
