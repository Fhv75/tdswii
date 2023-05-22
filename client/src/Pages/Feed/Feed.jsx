import React from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Feed () {
    const navigate = useNavigate()

    function navigateToProfile() {
        navigate(`/user/${localStorage.getItem("username")}`)
    }

    return (
        <>
            <h1>Hola</h1>
            <Button onClick={ () => navigate("/login") }>Ir a Login</Button>
            <br />
            <Button onClick={ () => navigate("/register") }>Ir a Registro</Button>
            <br />
            <Button onClick={ () => navigate("/password-recovery") }>Ir a Recuperación de Contraseña</Button>
            <br />
            <Button onClick={ () => navigate("/contact-Form") }>Contacto</Button>
            <br />
            {localStorage.getItem('token') && <Button onClick={navigateToProfile}>Ir a perfil</Button>}
        </>
    )
}

export default Feed;