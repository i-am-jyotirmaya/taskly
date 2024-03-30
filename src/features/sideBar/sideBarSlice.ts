import { createSlice } from "@reduxjs/toolkit";

type SideBarState = {
  selectedCategory: "important" | "day" | "star" | "all";
};

const initialState: SideBarState = {
  selectedCategory: "day",
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = sideBarSlice.actions;

export default sideBarSlice.reducer;
