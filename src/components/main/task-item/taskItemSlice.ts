import { TasksAPI } from "@/api/tasks.api";
import { TaskSchema } from "@/schemas/task-schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TaskItemState = {
  deletingIds: Record<string, boolean>;
  finishingIds: Record<string, boolean>;
};

const initialState: TaskItemState = {
  deletingIds: {},
  finishingIds: {},
};

export const deleteTask = createAsyncThunk("taskList/deleteTask", async (id: string) => {
  return await TasksAPI.deleteTask(id);
});

export const finishTask = createAsyncThunk("taskList/finishTask", async (task: TaskSchema) => {
  return await TasksAPI.finishTask(task);
});

const taskItemSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.deletingIds[action.payload] = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deletingIds[action.meta.arg] = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.deletingIds[action.meta.arg] = true;
    });
    builder.addCase(finishTask.fulfilled, (state, action) => {
      state.finishingIds[action.payload.id] = false;
    });
    builder.addCase(finishTask.rejected, (state, action) => {
      state.finishingIds[action.meta.arg.id] = false;
    });
    builder.addCase(finishTask.pending, (state, action) => {
      state.finishingIds[action.meta.arg.id] = true;
    });
  },
});

export default taskItemSlice.reducer;
