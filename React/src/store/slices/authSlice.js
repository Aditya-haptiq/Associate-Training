
import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState ? JSON.parse(serializedState) : {
      isAuthenticated: false,
      user: null,
      users: []
    };
  } catch (err) {
    console.error('Could not load auth state', err);
    return {
      isAuthenticated: false,
      user: null,
      users: []
    };
  }
};


const saveAuthState = (state) => {
  try {
    localStorage.setItem('auth', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save auth state', err);
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, name } = action.payload;
      const existingUser = state.users.find(user => user.email === email);
      
      if (!existingUser) {
        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          name,
          createdAt: new Date().toISOString()
        };
        state.users.push(newUser);
        state.user = { id: newUser.id, email: newUser.email, name: newUser.name };
        state.isAuthenticated = true;
        saveAuthState(state);
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      
      if (user) {
        state.user = { id: user.id, email: user.email, name: user.name };
        state.isAuthenticated = true;
        saveAuthState(state);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveAuthState(state);
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;