import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "../slice/user.slice"
export const store =
  configureStore({
    reducer: {
      User:UserSlice ,
    },

      
  });

export  type RootState =
  ReturnType<
    typeof store.getState
  >;

export type AppDispatch =
  typeof store.dispatch;