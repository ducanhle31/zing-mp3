import { useRef, useEffect } from "react";

import "./App.css";
import { useMusicPlayer } from "./player.slice";
function App() {
  const {
    songs,
    current,
    currentSong,
    isPlaying,
    volume,
    loop,
    shuffle,
    currentTime,
    durationTime,
    openMusicList,
    play,
    pause,
    next,
    prev,
    changeLoop,
    setCurrent,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setShuffle,
    setOpenMusicList,
  } = useMusicPlayer();
  document.title = currentSong.name;
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.preload = "metadata";
    audioRef.current.pause();
    audioRef.current.src = currentSong.src;
    isPlaying ? audioRef.current.play() : "";
    audioRef.current.volume = volume;
    audioRef.current.ontimeupdate = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };
  }, [currentSong]);

  useEffect(() => {
    setCurrentTime(audioRef.current.currentTime);
  }, [audioRef.current.currentTime]);
  useEffect(() => {
    setDuration(audioRef.current.duration);
  }, [
    audioRef.current.loadedmetadata,
    audioRef.current.readyState,
    current,
    isPlaying,
  ]);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (currentTime === durationTime) {
      if (loop === "one") {
        setCurrentTime(0);
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (loop === "all") {
        setCurrentTime(0);
        audioRef.current.currentTime = 0;
        next();
      } else if (loop === "no") {
        if (current < songs.length) {
          next();
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
          audioRef.current.currentTime = 0;
        }
      }
    }
  }, [currentTime]);

  const handleChangeTime = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  const handleChangeVolume = (e) => {
    setVolume(Number(e.target.value));
    audioRef.current.volume = e.target.value;
  };
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

  return (
    <div className="music-wrap">
      <div className="music">
        <div className="music-info">
          <div className="music-info-img">
            <img src="/logo.png" alt="" />
          </div>
          <div className="music-info-des">

            <div className="music-info-name">{currentSong.title}</div>
            <div className="music-info-artis">{currentSong.singer}</div>
          </div>
          <div className="music-info-favorite">
          <i class="bi bi-heart"></i>
          </div>
        </div>
        <div className="music-player">
          <div className="music-player-button">
            <div
              className={`music-player-button-item ${shuffle ? "active" : ""}`}
              onClick={setShuffle}
            >
              <i class="bi bi-shuffle"></i>
            </div>
            <div className="music-player-button-item" onClick={prev}>
  <i class="bi bi-skip-backward-fill"></i>
            </div>
            <div
              className="music-player-button-item large"
              onClick={isPlaying ? pause : play}
            >
              {isPlaying ? (
            <i class="bi bi-pause-fill"></i>
              ) : (
              <i class="bi bi-play-fill"></i>
              )}
            </div>
            <div className="music-player-button-item" onClick={next}>
          <i class="bi bi-skip-forward-fill"></i>
            </div>
            <div
              className={`music-player-button-item ${
                loop === "one" || loop === "all" ? "active" : ""
              }`}
              onClick={changeLoop}
            >
              {loop === "one" ? (    <i class="bi bi-repeat-1"></i>
        
              ) : (
              <i class="bi bi-repeat"></i>
              )}
            </div>
          </div>
          <div className="music-player-time">
            <div className="time-start">
              {caculateTime(Math.floor(currentTime))}
            </div>
            <div className="time-duration-wrap">
              <input
                type="range"
                name=""
                max={Math.floor(durationTime)}
                min={0}
                step={0.1}
                value={currentTime}
                className="time-duration"
                id=""
                onChange={(e) => {
                  handleChangeTime(e);
                }}
              />
              <div
                className="progress"
                style={{
                  right: `${100 - (currentTime / durationTime) * 100}%`,
                }}
              ></div>
            </div>
            <div className="time-end">
              {durationTime &&
                !Number.isNaN(durationTime) &&
                caculateTime(Math.floor(durationTime))}
            </div>
          </div>
        </div>
        <div className="music-volume">
          <div
            className="music-volume-icon"
            onClick={() => {
              setVolume(volume === 0 ? 1 : 0);
              audioRef.current.volume = volume === 0 ? 1 : 0;
            }}
          >
            {volume === 0 ? (
    <i class="bi bi-volume-mute-fill"></i>
            ) : (
                    <i class="bi bi-volume-up-fill"></i>
            )}
          </div>
          <div className="volume-duration-wrap">
            <input
              type="range"
              max={1}
              min={0}
              step={0.01}
              name=""
              id=""
              value={volume}
              onChange={(e) => {
                handleChangeVolume(e);
              }}
              className="music-volume-duration"
            />
            <div
              className="volume-progress"
              style={{ right: `${100 - volume * 100}%` }}
            ></div>
          </div>
          <div
            className="mobile-list-btn"
            onClick={() => {
              setOpenMusicList(!openMusicList);
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m19.684 5.821-9-3.272A1.998 1.998 0 0 0 8 4.428v6.129A3.953 3.953 0 0 0 6 10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V4.428L19 7.7v6.856A3.962 3.962 0 0 0 17 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V7.7c0-.838-.529-1.594-1.316-1.879zM6 16c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm11 4c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="music-list-wrap">
        <h2>Playlist</h2>
        <div className="music-content">
          <div className="music-now">
      
            
            <div className="music-now-name">{currentSong.title}</div>
            <div className="music-now-artist">{currentSong.singer}</div>
              <div
              className="music-player-button-item large"
              onClick={isPlaying ? pause : play}
            >
              {isPlaying ? (
               <div className="playing">
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                        </div>
              ) : (
                <i class="bi bi-play-fill"></i>
              )}
            </div>
            <div className="music-now-picture">
            <img src="/logo.png" alt="" />
            </div>
          </div>
          <div className={`music-list ${openMusicList ? "active" : ""}`}>
            <div className="music-sign">
              <div className="music-sign-item">
              <i class="bi bi-music-note-beamed"></i>
              </div>
              <div className="music-sign-item">Bài hát</div>
              <div className="music-sign-item">Tác giả</div>
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
                    <div
                      className="item-button"
                      onClick={() => {
                        if (isPlaying && current !== item.id) {
                          setCurrent(item.id);
                        } else if (isPlaying && current === item.id) {
                          setIsPlaying(false);
                        } else if (!isPlaying && current === item.id) {
                          setIsPlaying(true);
                        } else {
                          setIsPlaying(true);
                          setCurrent(item.id);
                        }
                      }}
                    >
                      {isPlaying && current === item.id ? (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          fontSize={30}
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 7h3v10H8zm5 0h3v10h-3z" />
                        </svg>
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          fontSize={30}
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: 4 }}
                        >
                          <path d="M7 6v12l10-6z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="item">{item.title}</div>
                  <div className="item">{item.singer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
