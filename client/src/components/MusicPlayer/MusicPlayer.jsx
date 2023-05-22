import React from 'react'
import styles from './musicPlayer.module.css'
import{ useState, useRef, useEffect} from 'react'

function MusicPlayer(props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)

    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        function updateProgress() {
            setCurrentTime((audio.currentTime / audio.duration) * 100)
        }

        if(audio) {
            audio.addEventListener("timeupdate", updateProgress)
            return () => audio.removeEventListener("timeupdate", updateProgress)
        }
    }, [audioRef])

    function togglePlay () {
        const audio = audioRef.current

        if(isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }

        setIsPlaying(!isPlaying)
    }

    function onTimeSliderChange(e) {
        const audio = audioRef.current
        audio.currentTime = (e.target.value / 100) * audio.duration
    }

    function onVolumeChange(e) {
        const audio = audioRef.current
        audio.volume = e.target.value
        setVolume(e.target.value)
    }

    return (
        <div class={styles.player}>
            <audio id={styles.audioPlayer} preload="none" ref={audioRef}>
                <source src={props.trackPath} type="audio/mpeg" />
            </audio>
            <div class={styles.controls}>
                <button onClick={togglePlay} id={styles.playPauseButton}> 
                    {isPlaying ? 'Pause' : 'Play'} 
                </button>
                <input 
                    id={styles.timeSlider} 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={currentTime} 
                    onChange={onTimeSliderChange}    
                />
                <div 
                    id="progressBar" 
                    style={{width: `${currentTime}%`}}></div>
                <input 
                    id="volumeControl" 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={volume}
                    onChange={onVolumeChange}   
                >   
                </input>
            </div>
        </div>
    )
}

export default MusicPlayer