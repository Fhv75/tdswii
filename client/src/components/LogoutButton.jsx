import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutButton () {

    const navigate = useNavigate()
    
    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/logout')
    }

    return (
        <>
            {
                localStorage.getItem('token') &&
                <>
                    <br/>
                    <button onClick={handleLogout}>Logout</button>
                    <br/>
                </>
            }
        </>
    )
}

export default LogoutButton