import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import { useState } from "react";

const MusicCard = ({ track }) => {
    const [rating, setRating] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    const handleRating = (hover) => {
        console.log(hover)
        setRating(rating)
    }

    const onPointerEnter = () => {
        setIsHovering(true)
    }
    const onPointerLeave = () => {
        setIsHovering(false)
    }


    return (
        <Card style={{ width: "30rem" }}>
            <Row>
                <Col>
                    <Card.Img variant="top" src={track.image} />
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
                        transition
                        allowHover={false}
                        fillColor={isHovering ? 'red' : 'orange'}
                        allowFraction
                        disableFillHover={true}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                    />
                </Col >
            </Row >
        </Card >
    );
};

export default MusicCard;
