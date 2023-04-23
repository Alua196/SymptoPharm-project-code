
import { createSlice} from "@reduxjs/toolkit";

const initialState = {

    favItems: [],
    totalAmount:0,
    totalQuantity:0
}

const favSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addItem: (state, action) =>{
            const newItem = action.payload;
            const existingItem = state.favItems.find(
                (item)=> item.id === newItem.id
            );

            state.totalQuantity++

            if(!existingItem){
                state.favItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    image: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.totalAmount = state.favItems.reduce(
                (total, item)=> total + Number(item.price) * Number(item.quantity)
            );
        },
    },
});

export const favActions = favSlice.actions

export default favSlice.reducer