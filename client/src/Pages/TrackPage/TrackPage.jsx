import React from 'react';
import './trackPage.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import MusicCard from "../../components/MusicCard/MusicCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap';

export default function TrackPage() {

  const navigate = useNavigate()
  const { trackId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [track, setTrack] = useState({})
  const [averageRating, setAverageRating] = useState(0);
  const [totalComments, setTotalComments] = useState(0)

  useEffect(() => {
    async function getTrack() {
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
      try {
        const response = await axios.post(
          'http://localhost:5000/audio/getTrack',
          {
            trackId: trackId
          },
        )
        console.log(response.data)
        setTrack(response.data)
      }
      catch (error) {
        console.log(error)
      }
    }

    async function getStatistics() {
        try {
            const response = await axios.post(
                'http://localhost:5000/audio/getStatistics',
                {
                    trackId : trackId
                },                    
            )
            setAverageRating(response.data.averageRating || 0);
            setTotalComments(response.data.comments || 0)
            setIsLoading(false)
        } catch (error) {     
            console.log(error)
        }            
    }

    getTrack()
    getStatistics()

  }, [])

  async function addReproduccion() {
    try {
        await axios.get(
            `http://localhost:5000/audio/addReproduccion/${track.id}`,
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100 ">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7" style={{ width: "900px" }}>
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={ track.imagen_pista }
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{track.titulo}</MDBTypography>
                  <MDBCardText>{track.artista}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div className="w-50 me-auto">
                    <audio controls className="mt-3 w-100" onEnded={addReproduccion}>
                            <source src={ track.nombre_archivo }/>
                    </audio>  
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{!isLoading ? track.cant_reprod : <Spinner animation="border" size="sm" role="status" />}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Reproducciones</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{!isLoading ? averageRating : <Spinner animation="border" size="sm" role="status" />} </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Valoración</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{!isLoading ? totalComments : <Spinner animation="border" size="sm" role="status" />}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0"> Comentarios</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Comentarios</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  {
                    
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