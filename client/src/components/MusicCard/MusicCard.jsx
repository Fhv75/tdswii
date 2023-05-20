import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function MusicCard ({ track }) {
    const rating = useRef(0)
    const [isHovering, setIsHovering] = useState(false)
    
    useEffect(() => {
        rating.current = track.rating
    }, [track.rating])

    async function handleRating (rate) {
        rating.current = rate
        console.log(rating.current)
        await rateTrack()
    }

    function onPointerEnter () {
        setIsHovering(true)
    }
    function onPointerLeave () {
        setIsHovering(false)
    }

    async function rateTrack() {
        try {
            const response = await axios.post(
                "http://localhost:5000/audio/rate-track",
                {
                    token: localStorage.getItem("token"),
                    rating: rating.current,
                    trackTitle: track.title,
                    trackArtist: track.artist
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


    return (
        <Card className="p-3 m-3" style={{ width: "30rem" }}>
            <Row>
                <Col>
                    <Card.Img src={track.image} />
                </Col>
                <Col>
                    <h5>{track.title}</h5>
                    <p className="mb-1">{track.artist}</p>
                    <p className="mb-4">{track.album}</p>
                    <audio controls>
                        <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                </Col>
            </Row>
            <Row>
                <Col>
                    Rate
                </Col>
                <Col>
                    <Rating
                        onClick={handleRating}
                        initialValue={track.rating}
                        transition
                        allowHover={false}
                        fillColor={isHovering ? 'red' : 'orange'}
                        allowFraction
                        disableFillHover={true}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        readonly={localStorage.getItem("token") ? false : true}
                    />
                </Col >
            </Row >
        </Card >
    );
};

export default MusicCard;