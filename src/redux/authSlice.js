import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  user: null, // Aquí puedes guardar datos del usuario si los necesitas
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user || null; // Guarda datos adicionales del usuario si es necesario
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
