import { Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AuthenticationProtectedRoute() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false)


    useEffect(() => {
        async function isAdmin() {
            try {
                const response = await axios.post(
                    'http://localhost:5000/users/isAdmin', 
                    { token: token },
                    { headers: { 'x-access-token': token } }
                )                    
                    setFlag(true)
                } catch (error) {
                    console.log(error)
                    if(error.response.status === 404)
                        navigate('/')
            }
        }

        isAdmin()
        
    }, [navigate, token])

    if (!flag) {
        return <></>
    }

    // returns child route elements
    return <Outlet />
};
export default AuthenticationProtectedRoute;