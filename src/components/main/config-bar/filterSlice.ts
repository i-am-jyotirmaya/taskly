import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserFilters, saveUserFilters } from "@/api/filters.api";

import { Filter } from "@/filters";

export type FilterState = {
  activeFilters: Filter[];
  quickFilters: Filter[];
  loading: boolean;
  error: string | null;
};

const initialState = {
  activeFilters: {},
  quickFilters: [],
  loading: false,
  error: null,
};

export const loadUserFilters = createAsyncThunk("filters/loadUserFilters", async () => {
  const response = await fetchUserFilters();
  return response;
});

export const updateUserFilters = createAsyncThunk("filters/updateUserFilters", async (filters: Filter[]) => {
  //   await saveUserFilters(filters);
  return filters;
});

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetFilters(state) {
      state.activeFilters = {};
      state.quickFilters = [];
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(loadUserFilters.pending, (state) => {
  //         state.loading = true;
  //       })
  //       .addCase(loadUserFilters.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.activeFilters = action.payload.activeFilters;
  //         state.quickFilters = action.payload.quickFilters;
  //       })
  //       .addCase(loadUserFilters.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message;
  //       })
  //       .addCase(updateUserFilters.fulfilled, (state, action) => {
  //         state.activeFilters = action.payload.activeFilters;
  //         state.quickFilters = action.payload.quickFilters;
  //       });
  //   },
});

export const { resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
