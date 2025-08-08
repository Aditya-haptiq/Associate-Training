import { createSlice } from '@reduxjs/toolkit';

const loadCheckoutState = () => {
  try {
    const serializedState = localStorage.getItem('checkout');
    return serializedState
      ? JSON.parse(serializedState)
      : {
          shippingInfo: null,
          paymentInfo: null,
        };
  } catch (err) {
    console.error('Could not load checkout state', err);
    return {
      shippingInfo: null,
      paymentInfo: null,
    };
  }
};

const saveCheckoutState = (state) => {
  try {
    localStorage.setItem('checkout', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save checkout state', err);
  }
};

const initialState = loadCheckoutState();

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      saveCheckoutState(state);
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      saveCheckoutState(state);
    },
    clearCheckout: (state) => {
      state.shippingInfo = null;
      state.paymentInfo = null;
      saveCheckoutState(state);
    },
  },
});

export const { setShippingInfo, setPaymentInfo, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
