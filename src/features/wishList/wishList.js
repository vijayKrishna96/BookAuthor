import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items:[]
  },
  reducers: {
    addToWishList: (state , action) => {
        const duplicates = state.items.filter(
            item => item._id === action.payload._id)
        
        if(duplicates.length === 0){
            const wishListItem = {
                ...action.payload,
                quantity: 1
            }
            state.items.push(wishListItem)
        }else{
            state.items = state.items.map(item => {
                if(item._id === action.payload._id){
                    const itemWithUpdatedQty = {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    return itemWithUpdatedQty;
                }else{
                    return item;
                }
            })
        }
    },
    removeItems: (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      },
  }
})

// Action creators are generated for each case reducer function
export const { addToWishList ,removeItems } = wishlistSlice.actions

export default wishlistSlice.reducer