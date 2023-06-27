import React from 'react';
import './userProfile.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import MusicCard from "../../components/MusicCard/MusicCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap';

export default function UserProfile() {

  const navigate = useNavigate()
  const { username } = useParams()
  const [tracksData, setTracksData] = useState([])
  const [profileData, setProfileData] = useState({})
  const [responseStatus, setResponseStatus] = useState()
  const [estadisticas, setEstadisticas] = useState({ reproducciones: 0, valoraciones: 0, comentarios: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const storedUsername = localStorage.getItem('username');
  const isCurrentUser = storedUsername === username; // Verifica si el usuario es el mismo que está logeado
  const hasTracks = responseStatus === 200; // Verifica si hubo éxito en la obtención de pistas


  useEffect(() => {

    async function getTracks() {
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
      try {
        const response = await axios.post(
          'http://localhost:5000/audio/getUserTracks',
          {
            username: username
          },
        )
        console.log(response.data)
        setTracksData(response.data)
        response.data != null ?
          setResponseStatus(200) : setResponseStatus(0)
      }
      catch (error) {
        console.log(error)
        setResponseStatus(404)
      }
    }

    getTracks()

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
      } catch (error) {
        console.log("Error fetching user profile: ", error)
        if (error.response.status === 404)
          navigate('/404')
      }
    }
    fetchUserProfile()

    async function getEstadisticasUsuario() {
      try {
        const response = await axios.post(
          'http://localhost:5000/audio/getEstadisticasUsuario',
          {
            username: username
          },
        )
        console.log(response.data.totalReproducciones)
        setEstadisticas({ reproducciones: response.data.totalReproducciones, valoraciones: response.data.promedioValoraciones, comentarios: response.data.totalComentarios });
        setIsLoading(false)
      } catch (error) {
      }
    }
    getEstadisticasUsuario();
  }, [username])


  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100 ">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7" style={{ width: "900px" }}>
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{username}</MDBTypography>
                  <MDBCardText>{profileData.ciudad}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    {isCurrentUser && !hasTracks && (
                      <div style={{ paddingTop: "6px", paddingRight: "38px" }}>
                        <Button onClick={() => navigate("/upload")} variant='dark' className="mb-1 h6">¡Sube tu primera canción y observa cómo crecen tus estadísticas!</Button>
                      </div>
                    )}
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{!isLoading ? estadisticas.reproducciones : <Spinner animation="border" size="sm" role="status" />}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Reproducciones</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{!isLoading ? estadisticas.valoraciones : <Spinner animation="border" size="sm" role="status" />} </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Valoraciones</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{!isLoading ? estadisticas.comentarios : <Spinner animation="border" size="sm" role="status" />}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0"> Comentarios</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Acerca de mí</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">{profileData.biografia}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Mis Pistas</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  {
                    tracksData && responseStatus == 200 ?
                      tracksData.AudioFiles?.map(
                        (track) => {
                          const trackData = {
                            id: track.id,
                            titulo: track.titulo,
                            artista: tracksData.username,
                            plays: track.cant_reprod,
                            comments: 12,
                            src: track.nombre_archivo,
                            cover: track.imagen_pista === null ? "logomelorit" : track.nombre_archivo,
                          }
                          return (
                            <MusicCard key={track.id} track={trackData} />
                          )
                        }
                      ) : responseStatus == 0 ?
                        <div className="text-center">
                          <h2>No hay pistas</h2>
                        </div>
                        : responseStatus == 404 ?
                          <div className="text-center">
                            <h2>Error al cargar las pistas</h2>
                          </div>
                          :
                          <div className="text-center">
                            <Spinner className="me-3" animation="border" role="status" />
                            Cargando...
                          </div>
                  }
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}