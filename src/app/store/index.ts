import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import context from "./slices/context";
import user from "./slices/user";

const rootReducer = combineReducers({
  context,
  user,
});

const persistConfig = {
  key: "root",
  storage, // Usa localStorage
  whitelist: ["user", "context"], // Reducers que quieres persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist usa valores no serializables
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
