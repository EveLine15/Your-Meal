import { configureStore } from "@reduxjs/toolkit";
import { firebaseApi } from "../services/firebaseApi";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [firebaseApi.reducerPath]: firebaseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(firebaseApi.middleware)
})