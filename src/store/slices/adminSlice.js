import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAdmin: false
    },
    reducers: {
        setIsAdmin(state, action) {
            state.isAdmin = action.payload;
        }
    },
});

export const { setIsAdmin } = adminSlice.actions;
export default adminSlice.reducer;