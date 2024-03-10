import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TaskListModeSelectorState = {
  listMode: "list" | "grid";
};

const initialState: TaskListModeSelectorState = {
  listMode: "list",
};

export const taskListModeSelectorSlice = createSlice({
  name: "taskListModeSelector",
  initialState,
  reducers: {
    changeListMode: (state, action: PayloadAction<"list" | "grid">) => {
      state.listMode = action.payload;
    },
  },
});

export const { changeListMode } = taskListModeSelectorSlice.actions;

export default taskListModeSelectorSlice.reducer;
