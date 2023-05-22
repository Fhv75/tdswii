import React from 'react'
import styles from './musicPlayer.module.css'

function MusicPlayer() {
    return (
        <div class={styles.player}>
            <audio id={styles.audioPlayer} preload="none">
                <source src="path/to/your/audio/file.mp3" type="audio/mpeg" />
            </audio>
            <div class={styles.controls}>
                <button id={styles.playPauseButton}>Play</button>
                <input id={styles.timeSlider} type="range" min="0" max="100" value="0" />
                <div id="progressBar" style={{width: "0%"}}></div>
                <input id="volumeControl" type="range" min="0" max="1" step="0.1" value="1"></input>
            </div>
        </div>
    )
}

export default MusicPlayer