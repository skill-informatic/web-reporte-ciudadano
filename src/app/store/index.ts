import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import context from "./slices/context";

import user from "./slices/user";
const reducer = combineReducers({
  context,
  user,
});

export type RootState = ReturnType<typeof reducer>;

export default configureStore({
  reducer: reducer,
});
