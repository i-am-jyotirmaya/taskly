import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAnonymous: boolean;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

const initialState: AuthState = {
  isAnonymous: true,
  displayName: "",
  email: "",
  photoURL: "",
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedInAnonymously: (state, payload: PayloadAction<string>) => {
      state.isAnonymous = true;
      state.uid = payload.payload;
    },
  },
});

export const { signedInAnonymously } = authSlice.actions;

export default authSlice.reducer;
