import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";
import { FilterData } from "@/types/filter";

export type FilterState = {
  temporaryFilters: FilterData[];
  activeFilters: FilterData[];
  quickFilters: FilterData[];
  loading: boolean;
  error: string | null;
};

const initialState: FilterState = {
  temporaryFilters: [],
  activeFilters: [],
  quickFilters: [],
  loading: false,
  error: null,
};

// export const loadUserFilters = createAsyncThunk("filters/loadUserFilters", async () => {
//   const response = await fetchUserFilters();
//   return response;
// });

// export const updateUserFilters = createAsyncThunk("filters/updateUserFilters", async (filters: Filter[]) => {
//   //   await saveUserFilters(filters);
//   return filters;
// });

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetFilters(state) {
      state.temporaryFilters = [];
      state.activeFilters = [];
      state.quickFilters = [];
    },
    selectFilter(state, action: PayloadAction<FilterData>) {
      // Check if filter is already available, if not add it, if available, replace it.
      const index = state.temporaryFilters.findIndex((filter) => filter.filterField === action.payload.filterField);
      if (index === -1) {
        state.temporaryFilters.push(action.payload);
      } else {
        state.temporaryFilters[index] = action.payload;
      }
    },
    removeTempChanges(state) {
      state.temporaryFilters = [...state.activeFilters];
    },
    deselectFilter(state, action: PayloadAction<FilterData>) {
      state.temporaryFilters = state.temporaryFilters.filter(
        (filter) => filter.filterField !== action.payload.filterField
      );
    },
    activateFilters(state) {
      // state.temporaryFilters.forEach((filter) => {
      //   const indexInActive = state.activeFilters.findIndex((f) => f.filterField === filter.filterField);
      //   if (indexInActive > -1) {
      //     if (filter.filterValues) {
      //       state.activeFilters[indexInActive].filterValues = filter.filterValues;
      //     } else if (filter.filterBoolean) {
      //       state.activeFilters[indexInActive].filterBoolean = filter.filterBoolean;
      //     }
      //   } else {
      //     state.activeFilters.push(filter);
      //   }
      // });
      state.activeFilters = [...state.temporaryFilters];
      // state.temporaryFilters = []; // Clear temporary filters after activation.
    },
    deactivateFilter(state, action: PayloadAction<FilterData>) {
      state.activeFilters = state.activeFilters.filter((filter) => filter.filterField !== action.payload.filterField);
    },
    addQuickFilter(state, action: PayloadAction<FilterData>) {
      state.quickFilters.push(action.payload);
    },
    removeQuickFilter(state, action: PayloadAction<FilterData>) {
      state.quickFilters = state.quickFilters.filter((filter) => filter.filterField !== action.payload.filterField);
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

export const {
  resetFilters,
  activateFilters,
  addQuickFilter,
  deactivateFilter,
  deselectFilter,
  removeQuickFilter,
  selectFilter,
  removeTempChanges,
} = filterSlice.actions;
export default filterSlice.reducer;
