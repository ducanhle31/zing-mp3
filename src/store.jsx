import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player.slice";

const store = configureStore({
  reducer: {
    player: playerReducer
  }
});

export default store;
