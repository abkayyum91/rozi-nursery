import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


// const items = localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList") || '{}') : [];


export interface CartItem {
    _id: string;
    title: string
    category: string
    imageUrl: string
    mrp: number;
    price: number;
    qty: number;
    subTotal: number;
}

interface CartState{
    cartItem: CartItem[]
}
const initialState: CartState = {
    cartItem: []
}

const quotationCartSlice = createSlice({
    name: "quotationCart",
    initialState,
    reducers: {
        addItemFromLocalStorage: (state, action: PayloadAction<CartItem[]>)=>{
            state.cartItem = action.payload;
        },
        addItem: (state, action:PayloadAction<CartItem>)=>{
            state.cartItem.push(action.payload);
        },
        removeItem: (state, action:PayloadAction<string>)=>{
            state.cartItem = state.cartItem.filter((item)=> item._id !== action.payload);
        },
        addQty: (state, action:PayloadAction<string>)=>{
            state.cartItem = state.cartItem.map((item)=> {
                if (item._id === action.payload){
                    return {
                        ...item,
                        qty: item.qty + 1,
                        subTotal: (item.qty + 1) * item.price,
                    };
                }
                return item
            })
        },
        removeQty: (state, action:PayloadAction<string>)=>{
            state.cartItem.map((item)=> {
                if (item._id === action.payload){
                    if (item.qty > 1){
                        item.qty--;
                        item.subTotal = item.price * item.qty;
                    }
                }
                return item
            })
        },
        clearCart: (state)=>{
            state.cartItem = []
        }
    }
})


export const {addItemFromLocalStorage, addItem, removeItem, addQty, removeQty, clearCart} = quotationCartSlice.actions;
export const selectCartItem = (state: RootState)=> state.cart.cartItem;
export default quotationCartSlice.reducer;
