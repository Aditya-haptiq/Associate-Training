import { createSlice } from '@reduxjs/toolkit';

const loadWishlistState = () => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (err) {
    console.error('Could not load wishlist state', err);
    return { items: [] };
  }
};


const saveWishlistState = (state) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save wishlist state', err);
  }
};

const initialState = loadWishlistState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (!existingItem) {
        state.items.push(product);
        saveWishlistState(state);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      saveWishlistState(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistState(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
