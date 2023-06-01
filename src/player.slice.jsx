import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
const randomNumber = (one, arr) => {
  let y = one;
  let x = Math.ceil(Math.random() * arr.length);
  while (x === y) {
    x = Math.ceil(Math.random() * arr.length);
  }
  console.log(x);
  return x;
};
const musicPlayerSlice = createSlice({
  name: "musicplayer",
  initialState: {
    songs: [
      {
        id: 1,
        title: "Là Anh",
        singer: "Phạm Lịch",
        src: "/ong-ba-gia-tao-lo.mp3",
      },
      {
        id: 2,
        title: "Ông bà già tao lo",
        singer: "Bình Gold",
        src: "/la-anh.mp3",
      },
      {
        id: 3,
        title: "Buông đôi tay nhau ra",
        singer: "Bình Gold",
        src: "/Buong-Doi-Tay-Nhau-Ra-Son-Tung-M-TP.mp3",
      },
      {
        id: 4,
        title: "CHúng ta không thuộc về nhau ",
        singer: "Bình Gold",
        src: "/Chung-Ta-Khong-Thuoc-Ve-Nhau-Son-Tung-M-TP.mp3",
      },
      {
        id: 5,
        title: "Có chàng trai viết lên cây",
        singer: "Bình Gold",
        src: "/Co-Chang-Trai-Viet-Len-Cay-Phan-Manh-Quynh.mp3",
      },
      {
        id: 6,
        title: "Cỏ úa",
        singer: "Lệ Quyên",
        src: "/Co-Ua-Le-Quyen-Hoang-Hiep.mp3",
      },
      {
        id: 7,
        title: "Một năm mới bình an",
        singer: "Bình Gold",
        src: "/Mot-Nam-Moi-Binh-An-Son-Tung-M-TP.mp3",
      },
      {
        id: 8,
        title: "Sống như những đóa hoa",
        singer: "Bình Gold",
        src: "/Song-Nhu-Nhung-Doa-Hoa-Ta-Quang-Thang.mp3",
      },
      {
        id: 9,
        title: "Uyên ương hồ điệp",
        singer: "Bình Gold",
        src: "/Uyen-Uong-Ho-Diep-Mong-Ho-Quang-Hieu.mp3",
      },
      {
        id: 10,
        title: "Việt nam những chuyến đi",
        singer: "Bình Gold",
        src: "/Viet-Nam-Nhung-Chuyen-Di-Vicky-Nhung.mp3",
      },
      {
        id: 11,
        title: "Vợ người ta",
        singer: "Bình Gold",
        src: "/Vo-Nguoi-Ta-Phan-Manh-Quynh.mp3",
      },
    ],
    current: 1,
    isPlaying: false,
    volume: 1,
    loop: "no",
    shuffle: false,
    currentTime: 0,
    durationTime: "00:00",
    openMusicList: false,
  },
  reducers: {
    play(state, action) {
      state.isPlaying = true;
    },
    pause(state, action) {
      state.isPlaying = false;
    },
    next(state, action) {
      if (state.shuffle) {
        state.current = randomNumber(state.current, state.songs);
        state.isPlaying = true;
      } else
        switch (state.loop) {
          case "no":
            if (state.current < state.songs.length) {
              state.current++;
            } else {
              state.current = 1;
            }
            state.isPlaying = true;
            break;
          case "one":
            if (state.current < state.songs.length) {
              state.current++;
            } else {
              state.current = 1;
            }
            state.loop = "all";
            state.isPlaying = true;
            break;
          default:
            if (state.current < state.songs.length) {
              state.current++;
            } else {
              state.current = 1;
            }
            state.isPlaying = true;
        }
    },
    prev(state, action) {
      if (state.shuffle) {
        state.current = randomNumber(state.current, state.songs);
        state.isPlaying = true;
      } else {
        switch (state.loop) {
          case "no":
            if (state.current > 1) {
              state.current--;
              state.isPlaying = true;
            } else {
              state.current = state.songs.length;
            }
            break;
          case "one":
            if (state.current > 1) {
              state.current--;
            } else {
              state.current = state.songs.length;
            }
            state.loop = "all";
            state.isPlaying = true;
            break;
          default:
            if (state.current > 1) {
              state.current--;
            } else {
              state.current = state.songs.length;
            }
            state.isPlaying = true;
        }
      }
    },
    changeLoop(state, action) {
      switch (state.loop) {
        case "no":
          state.loop = "one";
          break;
        case "one":
          state.loop = "all";
          break;
        default:
          state.loop = "no";
      }
    },
    setShuffle(state, action) {
      state.shuffle = !state.shuffle;
    },
    setCurrent(state, action) {
      state.current = action.payload.id;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload.value;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload.value;
    },
    setDuration(state, action) {
      state.durationTime = action.payload.value;
    },
    setVolume(state, action) {
      state.volume = action.payload.value;
    },
    setOpenMusicList(state, action) {
      state.openMusicList = action.payload.value;
    },
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const musicPlayerActions = musicPlayerSlice.actions;

export const useMusicPlayer = () => { 
   const dispatch = useDispatch();
   const playerState = useSelector((state) => state.musicplayer);
  

  return {
    ...playerState,
  currentSong : playerState.songs.find((song) => {
    if (song.id === playerState.current) {
      return song.src;
    }
  }),
    play() {
      dispatch(musicPlayerActions.play());
    },
    pause() {
      dispatch(musicPlayerActions.pause());
    },
    next() {
      dispatch(musicPlayerActions.next());
    },
    prev() {
      dispatch(musicPlayerActions.prev());
    },
    changeLoop() {
      dispatch(musicPlayerActions.changeLoop());
    },
    setCurrent(id) {
      dispatch(musicPlayerActions.setCurrent({ id }));
    },
    setIsPlaying(value) {
      dispatch(musicPlayerActions.setIsPlaying({ value }));
    },
    setCurrentTime(value) {
      dispatch(musicPlayerActions.setCurrentTime({ value }));
    },
    setDuration(value) {
      dispatch(musicPlayerActions.setDuration({ value }));
    },
    setVolume(value) {
      dispatch(musicPlayerActions.setVolume({ value }));
    },
    setShuffle() {
      dispatch(musicPlayerActions.setShuffle());
    },
    setOpenMusicList(value) {
      dispatch(musicPlayerActions.setOpenMusicList({ value }));
    },
  };
};
