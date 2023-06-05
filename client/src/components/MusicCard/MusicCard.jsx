import React from 'react'
import { Card, Container, Row, Col, Button, Overlay, Popover, Badge } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faStar, faPlay, faComment } from '@fortawesome/free-solid-svg-icons'
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
        <Card style={{padding:0}} >
            <Card.Body >
                
                    <Row>
                        <Col md={3} className="d-flex">
                            <Card className="my-auto" style={{ width: '150px'}} >                 
                                <Card.Img src="/images/logomelorit.png" alt="Melorit Logo" />
                            </Card>
                        </Col>
                        <Col md={9} className="d-flex flex-column">
                            <h4 style={{fontSize:"18px"}}>{track.titulo}</h4>
                            <h6 style={{fontSize:"14px"}}>{track.artista}</h6>
                            <audio controls className="mt-auto">
                                <source src="http://localhost:5000/public/userUploads/audio/LAPRUEBA-ismapuntocom.mp3"/>
                            </audio>  
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <Container style={{marginTop: '15px' }}>                 
                                
                                    {
                                        tags.map((tag) => 
                                            <Badge bg="" text="dark" style={{marginRight: '5px', backgroundColor:"#eeeeee"}}>{tag.Tag.TAG}</Badge>
                                        )
                                    }
                                
                            </Container>
                        </Col>
                        <Col className="mt-auto">
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
                               <span style={{ marginLeft:'17px' }}>{track.plays}</span>

                               <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Total comments</Tooltip>}
                               >
                                 <FontAwesomeIcon icon={faComment} style={{color: "#b0b6bf", marginLeft:'36px', transform: "scale(1.85)"}} />
                               </OverlayTrigger>

                               <span style={{ marginLeft:'17px' }}>13</span>
                        </Col>
                    </Row>
                
            </Card.Body>
        </Card>
      );
}

export default MusicCard