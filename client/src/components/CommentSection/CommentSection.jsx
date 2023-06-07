import React from 'react';

function CommentSection({ comments }) {
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
