
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import wishlistSlice from './slices/wishlistSlice';
import productsSlice from './slices/ProductSlice';
import checkoutSlice from '../store/slices/checkoutSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    products: productsSlice,
    checkout:checkoutSlice,
  },  
});

export default store;