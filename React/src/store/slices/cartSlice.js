import { createSlice } from '@reduxjs/toolkit';

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (err) {
    console.error('Could not load cart state', err);
    return { items: [] };
  }
};



const saveCartState = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save cart state', err);
  }
};

const initialState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size = 'M', quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          size,
          quantity,
          cartId: `${product.id}-${size}-${Date.now()}`
        });
      }
      saveCartState(state);
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.items = state.items.filter(item => item.cartId !== cartId);
      saveCartState(state);
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;
      const item = state.items.find(item => item.cartId === cartId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveCartState(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartState(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;