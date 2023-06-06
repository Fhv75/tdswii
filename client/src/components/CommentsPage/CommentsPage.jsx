import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentsPage({ match }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Obtener los comentarios correspondientes al trackId de la URL
    /* const trackId = match.params.trackId; */
    getComments();
  },);

  async function getComments() {
    try {
      const response = await axios.post(
        `http://localhost:5000/audio/getComments/`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Comentarios de la pista</h2>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comentario}</p>
      ))}
    </div>
  );
}

export default CommentsPage;
