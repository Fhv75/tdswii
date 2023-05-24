import React from 'react'
import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UploadAudioFile from '../UploadAudio/UploadAudioFile'

import axios from 'axios'

function UserProfile () {
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({})
    const [uploadVisibility, setUploadVisibility] = useState(false)
    const [buttonMessage, setButtonMessage] = useState("Subir una Pista")

    const { username } = useParams()
    const [responseStatus, setResponseStatus] = useState(0)

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axios.post(
                    `http://localhost:5000/users/getUserData`,
                    { 
                        username: username
                    }
                )
                console.log(response)
                setProfileData(response.data)                
                setResponseStatus(response.status)
            } catch (error) {
                console.log("Error fetching user profile: ", error)
                setResponseStatus(404)
            }
        }
        fetchUserProfile()
    }, [username])

    return (
        <>
            {
                responseStatus === 0 ? 
                    <h4>Cargando...</h4> :
                responseStatus === 200 ? 
                    <div>
                        <h1>Perfil de Usuario</h1>
                        {
                            localStorage.getItem('token') && localStorage.getItem('username') === profileData.username &&
                            <>
                                <button onClick={() => {navigate('/edit-profile')}}>Editar Perfil</button>
                                <br />
                                <br />
                                <button onClick={() => {
                                        setUploadVisibility(!uploadVisibility)
                                        setButtonMessage(buttonMessage === "Subir una Pista" ? "Cancelar" : "Subir una Pista")
                                    }
                                }>{buttonMessage}</button>
                                <br />
                                {
                                    uploadVisibility && 
                                    <UploadAudioFile />
                                }
                            </>
                        }
                        <br />
                        <button onClick={() => {navigate('/')}}>Feed</button>
                        <br />
                        <br />
                        <p>Email: {profileData.email}</p>
                        <p>Username: {profileData.username}</p>
                        <p>Ciudad: {profileData.ciudad}</p>
                        <p>Bio: {profileData.biografia}</p>
                    </div>
                :
                    <h1>NOT FOUND</h1>
                
            }
        </>
        )
}

export default UserProfile