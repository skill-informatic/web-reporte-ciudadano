import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  usuario: {
    id_user: string;
    email: string;
    is_active: string;
  };
}

const initialState: State = {
  usuario: {
    id_user: "",
    email: "",
    is_active: "",
  },
};

export const contextSlice = createSlice({
  name: "context",
  initialState: initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<{ email: string }>) => {
      const { email } = action.payload;
      state.usuario.email = email;
    },
  },
});

export const { changeUser } = contextSlice.actions;

export default contextSlice.reducer;
