import React, { useEffect,useState } from "react";
import { Rating } from "react-simple-star-rating";
import NavBar from "../../components/NavBar/NavBar";
import axios from 'axios'
import MusicCard from "../../components/MusicCard/MusicCard";

function Feed () {
  const [tracks, setTracks] = useState([])
  
    
    useEffect(() => {
      async function getTracks() {
        try {
          const res = await axios.get('http://localhost:5000/audio/getAllTracks')
          setTracks(res.data)
          console.log(res.data)
        } catch(error) {
          console.log(error)
        }
      }
       getTracks()
}, [])
  
  return (
    <div>
          {
      tracks.map( 
        (track) => {
          const trackData = {
            id: track.id,
            titulo: track.titulo,
            plays: track.cant_reprod,
            comments: 12,
            src: track.nombre_archivo,
            cover: track.imagen_pista === null ? "logomelorit" : track.nombre_archivo,
          }
          return (
            track.isapproved ? 
            <MusicCard key={track.id} track={trackData} /> : <></>
          )
        }
          ) 
        }
    </div>
    
  )
}

export default Feed;
