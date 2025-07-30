import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  user: {
    uid: string;
    email: string;
  };
}

const initialState: State = {
  user: {
    uid: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<{ uid: string; email: string }>) {
      state.user = action.payload;
    },
    logout(state) {
      // verificar si realmente asi se reinicia el state
      state.user = initialState.user;
    },
  },
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
