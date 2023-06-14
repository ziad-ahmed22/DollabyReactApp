import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : null,
    name: null,
    password: null,
    passwordr: null,
  },
  isAuthenticated: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.data = action.payload;
    },
    logIn: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("auth", "true");
      localStorage.setItem("username", state.data.username);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
    },
  },
});

export const { signUp, logIn, logOut } = auth.actions;
export default auth.reducer;
