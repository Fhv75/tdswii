import React from 'react'
import { Card, Container, Row, Col, Button, Overlay, Popover } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faStar,faPlay } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios'

function MusicCard ({track}) {

    const [isHovering, setIsHovering] = useState(false)
    const [tags, setTags] = useState([])
    const [show, setShow] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const target = useRef(null);
    const rating = useRef(0)
    


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

    useEffect(() => {
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
        getStatistics()
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

        getTrackTags()
        getUserRating()
    }, [track.id])

    return (
        <Card style={{ width: '40rem' }} >
            <Card.Body >
                <Container>
                    <Row >
                        <Col md={6}>
                            <Card>                 
                                <Card.Img src="C:\Users\ismao\Documents\GitHub\tdswii\server\public\userUploads\images" alt="Track Image" />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h4>{track.titulo}</h4>
                            <h6>{track.artista}</h6>
                            <audio controls>
                                <source src="http://localhost:5000/public/userUploads/audio/LAPRUEBA-ismapuntocom.mp3"/>
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
                                 <FontAwesomeIcon icon={faPlay} style={{marginLeft:'40px', color: "green", transform: "scale(1.85)"}}/>
                               </OverlayTrigger>
                               <span style={{ marginLeft:'10px' }}>{track.plays}</span>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      );
}

export default MusicCard