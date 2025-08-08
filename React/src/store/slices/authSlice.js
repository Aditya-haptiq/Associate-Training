import { createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState
      ? JSON.parse(serializedState)
      : {
          isAuthenticated: false,
          user: null,
          users: [],
          loginError: null,
        };
  } catch (err) {
    console.error('Could not load auth state', err);
    return {
      isAuthenticated: false,
      user: null,
      users: [],
      loginError: null,
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
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
          id: crypto.randomUUID(),
          email,
          password: hashedPassword,
          name,
          createdAt: new Date().toISOString(),
        };
        state.users.push(newUser);
        state.user = { id: newUser.id, email: newUser.email, name: newUser.name };
        state.isAuthenticated = true;
        state.loginError = null;
        saveAuthState(state);
      } else {
        state.loginError = 'User already exists';
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email);

      if (user && bcrypt.compareSync(password, user.password)) {
        state.user = { id: user.id, email: user.email, name: user.name };
        state.isAuthenticated = true;
        state.loginError = null;
        saveAuthState(state);
      } else {
        state.loginError = 'Invalid email or password';
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loginError = null;
      saveAuthState(state);
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
