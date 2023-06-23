import React from 'react'
import { Card, Container, Row, Col, Button, Overlay, Popover, Badge, Modal, Form } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import { Rating } from 'react-simple-star-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft, faStar, faPlay, faComment } from '@fortawesome/free-solid-svg-icons'
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

    //Para compras
    const [showModal, setShowModal] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [isPurchasing, setIsPurchasing] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Obtener los datos de la tarjeta
        console.log('Número de tarjeta:', cardNumber);
        console.log('Fecha de expiración:', expirationDate);
        console.log('CVV:', cvv);
      
        // Realizar cualquier lógica adicional necesaria para validar la compra
      
        // Marcar la pista como comprada para el usuario
      
        // Actualizar los estados de compra
        setIsPurchasing(false);
        setPurchaseSuccess(true);
      };

  
    //------------------------------------

    async function handleRating(rate) {
        rating.current = rate        
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
    
// hello this is a test that
// should do something lol
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

//Para Comprar

            const handlePurchase = async () => {
                try {
                // Validar los campos del formulario antes de realizar la compra
                if (!paymentMethod || !cardNumber || !expirationDate || !cvv) {
                    console.log('Por favor, completa todos los campos');
                    return;
                }

                const response = await axios.post(
                    'http://localhost:5000/audio/purchaseTrack',
                    {
                    trackID: track.id,
                    paymentMethod,
                    cardNumber,
                    expirationDate,
                    cvv,
                    }
                );
                console.log(response.data);

                // Realizar cualquier lógica adicional necesaria después de la compra (por ejemplo, mostrar un mensaje de éxito)

                // Cerrar el modal de compra
                setShowModal(false);
                } catch (error) {
                console.log(error);
                // Mostrar mensaje de error si ocurre algún problema durante la compra
                }
            };
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
        <Card className="mx-auto my-3" style={{width: "85%"}}>
            <Card.Body className="d-flex flex-column">
                <Row className="d-flex align-items-center">
                    <Col md={4} className="d-flex">
                        <Card className="my-auto" style={{ maxWidth: '180px'}} >                 
                            <Card.Img src="/images/logomelorit.png" alt="Melorit Logo" />
                        </Card>
                    </Col>
                    <Col md={8} className="d-flex flex-column">
                        <h4 style={{fontSize:"22px"}}>{track.titulo}</h4>
                        <h6 style={{fontSize:"18px"}}>{track.artista}</h6>
                        <audio controls className="mt-3 w-100">
                            <source src="http://localhost:5000/public/userUploads/audio/LAPRUEBA-ismapuntocom.mp3"/>
                        </audio>  
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={6  } className="my-auto">
                        <Container>                 
                                {
                                    tags.map((tag) => 
                                        <Badge key={tag.Tag.TAG} bg="" text="dark" style={{marginRight: '5px', backgroundColor:"#eeeeee"}}>{tag.Tag.TAG}</Badge>
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
                {/*-------------Para Comentarios---------------*/}
                <Row className="my-4">
                    <Col className="mt-3">
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

             {/* Botón de compra */}
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                    Comprar
                    </Button>

                    {/* Modal de compra */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Formulario de Compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        {/*Formulario de compra */}
                    <Form>
                        <Form.Group controlId="paymentMethod">
                            <Form.Label>Método de Pago</Form.Label>
                            <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            <option value="">Seleccionar método de pago</option>
                            <option value="creditCard">Tarjeta de crédito</option>
                            <option value="paypal">PayPal</option>
                            {/* Agrega más opciones de método de pago si es necesario */}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Número de Tarjeta</Form.Label>
                            <Form.Control
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="expirationDate">
                            <Form.Label>Fecha de Expiración</Form.Label>
                            <Form.Control
                            type="text"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            />
                        </Form.Group>
                </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                             Cancelar
                        </Button>
                        <Button variant="primary" onClick={handlePurchase}>
                             Comprar
                        </Button>
                    </Modal.Footer>
                    </Modal>
                   
                    {/* Mensaje de compra exitosa */}
                    {purchaseSuccess && (
                        <div className="mt-3 alert alert-success" role="alert">
                        ¡Compra exitosa!
                        </div>
                    )}
            </Card.Body>
        </Card>
      );
}

export default MusicCard;