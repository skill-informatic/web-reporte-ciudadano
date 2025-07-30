import { Context } from "@/app/models/globalInfo.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Context = {
  user_info: {
    id_user: "",
    email: "",
    phone: "",
    role: "user",
    created_at: "",
    updated_at: "",

    city: "",
    state: "",
  },
  report_info: {
    id: "",
    title: "",
    content: "",
    category: "",
    image_url: "",
    coords: {
      latitude: 0,
      longitude: 0,
    },
    phone: "",
    id_user: "",
    city: "",
    state: "",
    status: "pendiente",
    created_at: "",
    updated_at: "",
    geohash: "",
  },
  place_info: {
    id: "",
    title: "",
    content: "",
    category: "",
    image_url: "",
    coords: {
      latitude: 0,
      longitude: 0,
    },
    phone: "",
    id_user: "",
    city: "",
    state: "",
    status: "open",
    created_at: "",
    updated_at: "",
    geohash: "",
  },
};

export const contextSlice = createSlice({
  name: "context",
  initialState: initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.user_info = action.payload;
    },
    changeAccountInfo: (state, action) => {
      state.user_info = action.payload;
      // Usamos un switch para actualizar el campo específico sin perder el resto de la información
    },
    resetLoginInfo: (state) => {
      state.user_info = initialState.user_info;
    },
    // Report
    setReportInfo: (state, action) => {
      state.report_info = action.payload;
    },
    resetReportInfo: (state) => {
      state.report_info = initialState.report_info;
    },

    // Place
    setPlaceInfo: (state, action) => {
      state.place_info = action.payload;
    },
    resetPlaceInfo: (state) => {
      state.place_info = initialState.place_info;
    },
  },
});

export const {
  setAccountInfo,
  changeAccountInfo,
  resetLoginInfo,
  setReportInfo,
  resetReportInfo,
  setPlaceInfo,
} = contextSlice.actions;

export default contextSlice.reducer;
