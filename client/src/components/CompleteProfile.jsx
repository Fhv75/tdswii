import React from 'react'
import { useNavigate } from 'react-router-dom'

function CompleteProfile () {

    const navigate = useNavigate()

    function completeProfile() {
        navigate("/edit-profile")
    }

    function maybeLater() {
        navigate("/")
    }

    return (
        <div>
            <h1>¿Quieres completar tu perfil ahora?</h1>
            <button onClick={completeProfile}>Si, quiero completar mi perfil</button>
            <button onClick={maybeLater}>Tal vez luego</button>
        </div>
    )
}

export default CompleteProfile