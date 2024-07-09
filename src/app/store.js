import { configureStore } from '@reduxjs/toolkit'

import loginReducer from '../features/login/loginSlice'
import cartReducer from '../features/cart/cartSlice'
import wishListReducer from '../features/wishList/wishList'

export default configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
    wishlist: wishListReducer
  }
})