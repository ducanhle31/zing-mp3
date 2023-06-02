import { useEffect, useRef } from "react";
import { usePlayer } from "./player.slice";
import "./App.css";

export default function App() {
  const {
    songs,
    current,
    isPlaying,
    loop,
    play,
    pause,
    next,
    prev,
    changeLoop,    shuffle,   setShuffle,    setCurrent,  
  } = usePlayer();
  const audioRef = useRef(new Audio());
  const currentTimeRef = useRef(null);
  const durationRef = useRef(null);
  const progressRef = useRef(null);
  const caculateTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    audioRef.current.ontimeupdate = () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progress = Math.round((currentTime / duration) * 100);

      if (currentTimeRef.current) {
        currentTimeRef.current.textContent = caculateTime(Math.floor(currentTime));
      }

      if (progressRef.current) {
        progressRef.current.value = progress;
      }
    };
  }, [currentTimeRef, progressRef]);

  useEffect(() => {
    audioRef.current.ondurationchange = () => {  const duration = audioRef.current.duration;
      if (durationRef.current)
        durationRef.current.textContent = caculateTime(Math.floor(duration)) ;

      if (progressRef.current) progressRef.current.value = 0;
    };
  }, [durationRef, progressRef]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.src = current.src;
    audioRef.current.play();
  }, [current]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePrev = () => {
    if (loop === "one") {
      audioRef.current.currentTime = 0;
    } else {
      prev();
    }
  };

  const handleNext = () => {
    if (loop === "one") {
      audioRef.current.currentTime = 0;
    } else {
      next();
    }
  };

  const handleChange = (e) => {
    const progress = e.target.value;
    const duration = audioRef.current.duration;

    const currentTime = (progress / 100) * duration;

    audioRef.current.currentTime = currentTime;
  };
  
  return (
    <div className="music-wrap"> 
      <div className="music-list-wrap">
        <h2>Playlist</h2>
      <div className="music-content"> 
         <div className="music-now">
            <h4>Now playing</h4>
            <div className="music-now-name">{current.title}</div>
            <div className="music-now-artist">{current.singer}</div>
            <div className="music-now-picture">
              <img src="./logo.png" alt="" />
            </div>
          </div>
    
      <div className="music-list " >
          <div className="music-sign">
              <div className="music-sign-item">#</div>
              <div className="music-sign-item">Title</div>
              <div className="music-sign-item">Artist</div>
            </div>
          <div className="music-list-item-wrap">
              {songs.map((item, index) => (
                <div
                  className={`music-list-item ${
                    current === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    setCurrent(item.id);
                  }}
                >
                  <div className="item-wrap">
                    <div className="item icon">
                      {isPlaying === true && current === item.id ? (
                        <div className="playing">
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </div>{" "}
                    <button className="item-button"  onClick={
                      
                      isPlaying && current === item.id ? pause : play}
                        >
            {isPlaying && current === item.id ? <i class="bi bi-pause-fill"></i> : <i class="bi bi-play-fill"></i>}
          </button>
                
                    
                  </div>
                  
                  <div className="item">{item.title}</div>
                  <div className="item">{item.singer}</div>
                </div>
              ))}
            </div>
            </div></div></div>
    
      <div className="music"> 
        <div className="music-info">
          <div className="music-info-img">
            <img src={current.img} alt="" />
          </div>
          <div className="music-info-des">
            <div className="music-info-name">{current.title}</div>
            <div className="music-info-artis">{current.singer}</div>
          </div>
          <div className="music-info-favorite">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
            </svg>
          </div>
        </div>
          <div className="music-player">
          <div className="music-player-button">
             <button
              className={`music-player-button-item ${shuffle ? "active" : ""}`}
              onClick={setShuffle}
            >
          <i class="bi bi-shuffle"></i>
            </button>
            <button className="music-player-button-item" onClick={handlePrev}>
          <i class="bi bi-skip-backward-fill"></i>
          </button>
            <button className="music-player-button-item large" onClick={isPlaying ? pause : play}>
            {isPlaying ? <i class="bi bi-pause-fill"></i> : <i class="bi bi-play-fill"></i>}
          </button>
            <button className="music-player-button-item" onClick={handleNext}>
          <i class="bi bi-skip-forward-fill"></i>
          </button>
            <button   className={`music-player-button-item ${
                loop === "one" || loop === "all" ? "active" : ""
              }`} onClick={changeLoop}>
            {loop === "no"
              ? <i class="bi bi-repeat"></i>
              : loop === "all"
              ? <i class="bi bi-repeat"></i>
              : <i class="bi bi-repeat-1"></i>}
          </button>
          
          </div>
          <div className="music-player-time">
            <div ref={currentTimeRef} className="time-start">
        
            </div>
            <div className="time-duration-wrap">
              <input
            ref={progressRef}
            min={0}   className="time-duration"
            max={100}
            type="range"
            name="duration"
            id="duration"
            onMouseDown={() => {
              audioRef.current.pause();
            }}
            onMouseUp={() => {
              if (isPlaying) {
                audioRef.current.play();
              }
            }}
            onChange={handleChange}
          />
            
          
            </div>
            <div ref={durationRef} className="time-end">
            
            </div>
          </div>
        </div>
  <div className="music-volume">
      
          <div className="volume-duration-wrap">
          
              <input
            min={0}
            max={1}
            step={0.1}
            type="range"
            name="volume"
            id="volume"   className="music-volume-duration"
            onChange={(e) => {
              audioRef.current.volume = e.target.value;  
            }}
          />
          
          
          </div>
        
        </div>







</div>
  
      
    </div>
  );
}
