import { configureStore } from "@reduxjs/toolkit";
import user, { InitalStateType } from "./user";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
}

export const persistedReducer = persistReducer(persistConfig, user)

export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
