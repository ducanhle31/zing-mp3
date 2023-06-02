import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
const randomNumber = (one, arr) => {
  let y = one;
  let x = Math.ceil(Math.random() * arr.length);
  while (x === y) {
    x = Math.ceil(Math.random() * arr.length);
  }
  return x;
};
const playerSlice = createSlice({
  name: "player",
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
    volume: 100,
    loop: "no",
    shuffle: false,
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
            state.isPlaying = true;
          }
          break;

        case "all":
          if (state.current < state.songs.length) {
            state.current++;
          } else {
            state.current = 1;
          }

          state.isPlaying = true;
          break;

        case "one":
          break;

        default:
          return state;
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
          }
          break;

        case "all":
          if (state.current > 1) {
            state.current--;
          } else {
            state.current = state.songs.length;
          }

          state.isPlaying = true;
          break;

        case "one":
          break;

        default:
          return state;
      }}
    
    },
    setShuffle(state, action) {
      state.shuffle = !state.shuffle;
    },
    loop(state, action) {
      if (state.loop === "no") {
        state.loop = "all";
      } else if (state.loop === "all") {
        state.loop = "one";
      } else {
        state.loop = "no";
      }
    },
    setCurrent(state, action) {
      state.current = action.payload.id;
    },
  }
});

const playerReducer = playerSlice.reducer;
const playerActions = playerSlice.actions;

export const usePlayer = () => {
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);

  return {
    ...playerState,
    current: playerState.songs.find((song) => song.id === playerState.current),
    play() {
      dispatch(playerActions.play());
    },
    pause() {
      dispatch(playerActions.pause());
    },
    next() {
      dispatch(playerActions.next());
    },
    prev() {
      dispatch(playerActions.prev());
    },
    changeLoop() {
      dispatch(playerActions.loop());
    },
    setShuffle(){dispatch(playerActions.setShuffle)},
        setCurrent(id) {
      dispatch(playerActions.setCurrent({ id }));
    }, 
  };
};

export default playerReducer;
