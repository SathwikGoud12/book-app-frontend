import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem("cartItems");
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return [];
    }
};

const initialState = {
    cartItems: loadCartFromLocalStorage(), // ✅ Load saved cart
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already Added to the Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK!"
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Save to localStorage
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ Save updated cart
        },

        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems"); // ✅ Remove from localStorage
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
