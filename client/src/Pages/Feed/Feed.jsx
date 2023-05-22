import React from "react";
import MusicCard from "../../components/MusicCard/MusicCard";
import NavBar from "../../components/NavBar/NavBar";

function Feed() {
  // Los datos de "trackData" son simulados. En el futuro, estos datos serán obtenidos de la base de datos.

  const trackData = {
    id: "1",
    title: "LA cosa FUNCIONA SEÑORES",
    artist: "fbn",
    album: "Album 1",
    image: "https://picsum.photos/300/300",
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    rating: 4.7
  }
  
  return (
    <>
      <NavBar />
      <MusicCard track={trackData}/>
    </>
  );
}

export default Feed;
