import React from 'react'
import { Card, Container, Row, Col, Button, Overlay, Popover } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faStar,faPlay } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios'

//Para comentarios
import CommentSection from '../CommentSection/CommentSection' 


function MusicCard ({track}) {

    const [isHovering, setIsHovering] = useState(false)
    const [tags, setTags] = useState([])
    const [show, setShow] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const target = useRef(null);
    const rating = useRef(0)

    //para comentarios
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    //--------------------------------------------------------

    async function handleRating(rate) {
        rating.current = rate
        console.log(rating)
        
        setTimeout(() => {
            setShow(!show)
        }, 500);
        await rateTrack()
    }

    function onPointerEnter() {
        setIsHovering(true)
    }

    function onPointerLeave() {
        setIsHovering(false)
    }

    async function resetRate() {
        rating.current = 0
        setTimeout(() => {
            setShow(!show)
        }, 300);
        await rateTrack()
    }
    

    async function rateTrack() {
        try {
            const response = await axios.post(
                "http://localhost:5000/audio/rateTrack",
                {
                    token: localStorage.getItem("token"),
                    rating: rating.current,
                    trackID: track.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    /* useEffect(() => { */
        async function getTrackTags (){
            try{
                const response = await axios.post(
                    'http://localhost:5000/audio/getTrackTags',
                    { 
                        trackId : track.id
                    }, 
                )  
                setTags(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        async function getStatistics() {
            try {
                const response = await axios.post(
                    'http://localhost:5000/audio/getStatistics',
                    {
                        trackId : track.id
                    },                    
                )
                console.log(response.data.averageRating)
                setAverageRating(response.data.averageRating || 0);
            } catch (error) {                
            }            
        }
       /*  getStatistics() */
        async function getUserRating() {
            try {
                const response = await axios.post(
                    "http://localhost:5000/audio/getUserRating",
                    {
                        token: localStorage.getItem("token"),
                        trackID: track.id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(response.data);
                rating.current = response.data.valoracion
            } catch (error) {
                console.log(error);
            }
        }

        // Para Añadir los comentarios de las pistas
 
        async function addComentario() {
            try {
              const response = await axios.post(
                'http://localhost:5000/audio/addComentario',
                {
                    token: localStorage.getItem("token"),
                    comentario: newComment,
                    id_pista: track.id
                    /* id_usuario: userId   */ //Faltaria relacionarlo con id del usuario
                },
                {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
              );
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }
// Para Obtener los comentarios
           async function getComentarios() {
            try {
              const response = await axios.post(
                'http://localhost:5000/audio/getComentarios',
                {
                  token: localStorage.getItem("token"),
                  trackID: track.id
                },
                {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
              );
              console.log(response.data);

              setComments(response.data);
              setShowComments(true);

            } catch (error) {
              console.log(error);
            }
          }  
   
//-------------------------------------------------------------------------------
    useEffect (()=> {   
        getStatistics();
        getTrackTags();
        getUserRating();
       // getComentarios(); 
        addComentario();
    // eslint-disable-next-line
    }, [track.id]);

    return (
        <Card style={{ width: '40rem' }} >
            <Card.Body >
                <Container>
                    <Row >
                        <Col md={6}>
                            <Card>                 
                                <Card.Img src="/images/logomelorit.png" alt="Melorit Logo" />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h4>{track.titulo}</h4>
                            <h6>{track.artista}</h6>
                            <audio controls>
                                <source src="./music.mp3"/>
                            </audio>                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Card style={{marginTop: '15px' }}>                 
                                <Card.Text>
                                    Etiquetas: {tags.map((tag) => tag.Tag.TAG).join(', ')}
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Button variant="a" ref={target} onClick={() => setShow(!show)}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Total Ratings</Tooltip>}
                                >
                                    <FontAwesomeIcon icon={faStar} style={{ color: "orange", height: "32px" }} />    
                                </OverlayTrigger>
                                                       
                            </Button>
                            <Overlay target={target.current} show={show}  
                                placement='top'>
                                    <Popover id="rating">
                                        <Rating
                                            onClick={handleRating}
                                            initialValue={rating.current}
                                            transition
                                            allowHover={false}
                                            fillColor={isHovering ? 'red' : 'orange'}
                                            allowFraction
                                            disableFillHover={true}
                                            onPointerEnter={onPointerEnter}
                                            onPointerLeave={onPointerLeave}
                                            readonly={localStorage.getItem("token") ? false : true}
                                            
                                        />
                                    <Button variant="" onClick={resetRate}>
                                            <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#c0c0c0", }} />
                                            
                                        </Button>
                                    </Popover>
                                </Overlay>
                               <span>{averageRating}</span>
                               <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Total plays</Tooltip>}
                               >
                                 <FontAwesomeIcon icon={faPlay} style={{marginLeft:'40px', color: "peru", transform: "scale(1.85)"}}/>
                               </OverlayTrigger>
                               <span style={{ marginLeft:'10px' }}>{track.plays}</span>  


                            {/*-------------Para Comentarios---------------*/}
                                <Row>
                                    <Col>
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Ingrese un comentario"
                                    />
                                    </Col>

                                    <Col>
                                        <Button variant="primary" onClick={addComentario} style={{ marginTop: '15px' }}>
                                        Comentar
                                        </Button>
                                    </Col>
                                    <hr/>
                                    <Col>
                                        <Button variant="secondary" onClick={getComentarios} style={{ marginTop: '15px' }}>
                                        Mostrar
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={() => setShowComments(false)} style={{ marginTop: '15px' }}>
                                        Ocultar 
                                        </Button>
                                    </Col>
                                </Row>

                                    {showComments && (
                                            <Row>
                                                <Col>
                                                    <CommentSection trackId={track.id} comments={comments} />
                                                </Col>
                                            </Row>
                                        )}                               
                            {/*----------------------------------------------------------------------------------- */}
            
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      );
}

export default MusicCard;