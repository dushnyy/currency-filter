import {configureStore} from '@reduxjs/toolkit';
import {appSlice} from "./appSlice";
import {dataSlice} from "./filterSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    data: dataSlice.reducer,
  },
});
