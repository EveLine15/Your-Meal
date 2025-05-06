import { configureStore } from "@reduxjs/toolkit";
import { firebaseApi } from "../services/firebaseApi";
import authReducer from "./slices/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [firebaseApi.reducerPath]: firebaseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(firebaseApi.middleware)
})