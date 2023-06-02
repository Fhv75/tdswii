import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MusicCard ({track}) {

    const [tags, setTags] = useState([])
    const [rating, setRating] = useState(0)
    useEffect(() => {
        async function getStatistics() {
            try {
                const response = await axios.post(
                    'http://localhost:5000/audio/getStatistics',
                    {
                        trackId : track.id
                    },                    
                )
                console.log(response.data)
                setRating(response.data[0]?.valoracion || 0);
                
            } catch (error) {                
            }            
        }
        getStatistics()
        async function getTrackTags (){
            try{
                const response = await axios.post(
                    'http://localhost:5000/audio/getTrackTags',
                    { 
                        trackId : track.id
                    }, 
                )  
                console.log(response.data)
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
                            <h6>Played {track.plays} times</h6> 
                            <h6>{rating}</h6>           
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
                    </Row>
                </Container>
            </Card.Body>
        </Card>
      );
}

export default MusicCard