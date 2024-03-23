import { TasksAPI } from "@/api/tasks.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TaskItemState = {
  deleting: boolean;
};

const initialState: TaskItemState = {
  deleting: false,
};

export const deleteTask = createAsyncThunk("taskList/deleteTask", async (id: string) => {
  return await TasksAPI.deleteTask(id);
});

const taskItemSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.deleting = true;
    });
  },
});

export default taskItemSlice.reducer;
