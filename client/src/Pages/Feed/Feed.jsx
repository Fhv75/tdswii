import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import MusicCard from "../../components/MusicCard/MusicCard";
import axios from "axios";
import { useState } from "react";


function Feed () {

  const [tracksData, setTracksData] = useState([])
  async function getTracks (){
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = true
    try{
      const response = await axios.post(
        'http://localhost:5000/audio/getUserTracks',
        { 
            token : localStorage.getItem("token")
        }, 
      )  
      console.log(response.data)
      setTracksData(response.data)
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <NavBar />
      <button onClick={getTracks}>
        hola
      </button>
      {tracksData &&
      tracksData.map(
        (track)=>{
          const trackData = {
            titulo: track.titulo,
            artista: track.User.username,
            etiquetas: "etiquetas"
          }
          return(
            <MusicCard track={trackData} />
          )
        }
      )}
    </div>
    
  )
}

export default Feed