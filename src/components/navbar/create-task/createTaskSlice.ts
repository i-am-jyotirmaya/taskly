import { TasksAPI } from "@/api/tasks.api";
import { TaskSchema } from "@/schemas/task-schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type CreateTaskState = {
  submitting: boolean; // Whether the task list is loading or not
  error: string; // Error message if the task list fails to load
};

const initialState: CreateTaskState = {
  submitting: false,
  error: "",
};

export const createTask = createAsyncThunk("CreateTasks/CreateTasks", async (task: TaskSchema) => {
  await TasksAPI.createTask(task);
});

const createTaskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.submitting = true;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.submitting = false;
      state.error = "Failed to create Task";
    });
    builder.addCase(createTask.fulfilled, (state) => {
      state.submitting = false;
    });
  },
});

export default createTaskSlice.reducer;
