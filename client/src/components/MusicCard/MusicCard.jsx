import React from 'react'
import { Card, Container, Row, Col, Button, Overlay, Popover } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function MusicCard ({track}) {

    const [rating, setRating] = useState(-1)
    const [isHovering, setIsHovering] = useState(false)
    const [tags, setTags] = useState([])
    const [show, setShow] = useState(false);
    const target = useRef(null);


    async function handleRating(rate) {
        setRating(rate)
        console.log(rating)
        
        setTimeout(() => {
            setShow(!show)
        }, 300);
        await rateTrack()
    }

    function onPointerEnter() {
        setIsHovering(true)
    }

    function onPointerLeave() {
        setIsHovering(false)
    }

    async function rateTrack() {
        try {
            const response = await axios.post(
                "http://localhost:5000/audio/rate-track",
                {
                    token: localStorage.getItem("token"),
                    rating: rating,
                    trackTitle: track.titulo,
                    trackArtist: track.artista
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

        getTrackTags()
    }, [track.id])


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
                                <FontAwesomeIcon icon={faStar} style={{ color: "orange", height: "32px" }} />
                            </Button>
                            <Overlay target={target.current} show={show}  
                                placement='top'>
                                    <Popover id="rating">
                                        <Rating
                                            onClick={handleRating}
                                            initialValue={rating}
                                            transition
                                            allowHover={false}
                                            fillColor={isHovering ? 'red' : 'orange'}
                                            allowFraction
                                            disableFillHover={true}
                                            onPointerEnter={onPointerEnter}
                                            onPointerLeave={onPointerLeave}
                                        />
                                    </Popover>
                                </Overlay>
                                4.7
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      );
}

export default MusicCard