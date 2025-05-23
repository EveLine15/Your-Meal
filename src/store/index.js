import { configureStore } from "@reduxjs/toolkit";
import { firebaseApi } from "../services/firebaseApi";

export const store = configureStore({
    reducer: {
        [firebaseApi.reducerPath]: firebaseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(firebaseApi.middleware)
})