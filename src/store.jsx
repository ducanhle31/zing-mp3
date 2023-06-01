import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./player.slice";
const store = configureStore({ reducer: { musicplayer: musicPlayerReducer } });

export default store;
