import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ trackId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [trackId]);

  //Función que obtiene todos los comentarios
  async function getComments() {
    try {
      const response = await axios.post('http://localhost:5000/audio/getComentarios', {
        trackID: trackId
      });
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }
//--------------------------------------------------------
  return (
    <div>
      <h5>Comentarios:</h5>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comentario}</p>
      ))}
    </div>
  );
}

export default CommentSection;
