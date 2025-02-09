import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as jwt from "jsonwebtoken";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: object;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
    return payload.exp * 1000 > Date.now(); // Vérifie si le token est expiré
  } catch (error) {
    return false; // En cas d'erreur, on considère le token invalide
  }
};

const storedToken = localStorage.getItem("token");
const decodedToken = storedToken ? JSON.parse(atob(storedToken.split(".")[1])) : null;

const initialState: AuthState = {
  token: isTokenValid(storedToken) ? storedToken : null,
  isAuthenticated: isTokenValid(storedToken),
  user: decodedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      if (!isTokenValid(action.payload.token)) {
        state.token = null;
        state.isAuthenticated = false;
        state.user = {};
        return;
      }
      
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
