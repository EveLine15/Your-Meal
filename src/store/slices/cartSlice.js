import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        amountOfMeals: 0,
        price: 0,
    },
    reducers: {
        setCart(state, action) {
            state.items = action.payload;
            const totals = calculateTotals(state.items);
            state.amountOfMeals = totals.amount;
            state.price = totals.totalPrice;
        }
    },
});

function calculateTotals(cart) {
    return {
        amount: cart.reduce((a, item) => a + Number(item.amount), 0),
        totalPrice: cart.reduce((a, item) => a + item.amount * item.price, 0),
    };
}

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
