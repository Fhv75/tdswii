import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Realizar solicitud GET para obtener todos los comentarios
    axios.get('http://localhost:5000/audio/getComments')
      .then(response => {
        console.log(response.data); // Imprimir los comentarios obtenidos en la consola
        // Almacenar los comentarios obtenidos en el estado
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h5>Comentarios:</h5>
      {comments.map(comment => (
        <p key={comment.id}>{comment.comentario}</p>
      ))}
    </div>
  );
}

export default CommentsPage;

