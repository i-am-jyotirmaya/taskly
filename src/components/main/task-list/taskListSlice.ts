import { TasksAPI } from "@/api/tasks.api";
import { TaskSchema } from "@/schemas/task-schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTask } from "@/components/main/task-item/taskItemSlice";

export type TaskListState = {
  listLoading: boolean; // Whether the task list is loading or not
  taskList: TaskSchema[];
  error: string; // Error message if the task list fails to load
};

const initialState: TaskListState = {
  listLoading: false,
  taskList: [],
  error: "",
};

export const fetchAllTasks = createAsyncThunk("taskList/fetchAllTasks", async () => {
  const dataFromFS = await TasksAPI.getTasks();
  return dataFromFS;
});

// export const deleteTask = createAsyncThunk("taskList/deleteTask", async (id: string) => {
//   return await TasksAPI.deleteTask(id);
// });

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.listLoading = true;
    });
    builder.addCase(fetchAllTasks.rejected, (state) => {
      state.listLoading = false;
      state.error = "Failed to fetch task list";
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.listLoading = false;
      state.taskList = action.payload;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskList = state.taskList.filter((task) => task.id !== action.payload);
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.error = "Failed to delete task";
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.error = "";
    });
  },
});

export default taskListSlice.reducer;
