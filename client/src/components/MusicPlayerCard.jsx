import React from 'react';

const MusicPlayerCard = ({ trackName, artist, rating, playCount, comments }) => {
  return (
    <div className="music-player-card">
      <h2>{trackName}</h2>
      <h3>By {artist}</h3>
      <div className="statistics">
        <p>Rating: {rating}</p>
        <p>Play Count: {playCount}</p>
        <p>Comments: {comments?.length}</p>
      </div>
    </div>
  );
};

export default MusicPlayerCard;
