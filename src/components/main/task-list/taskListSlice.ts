import { TasksAPI } from "@/api/tasks.api";
import { TaskSchema } from "@/schemas/task-schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  // const getTasksPromise = Promise.all([TasksAPI_JSON_SERVER.getAllTasks(), TasksAPI.getTasks()]);
  // const [data, dataFromFS] = await getTasksPromise;
  const dataFromFS = await TasksAPI.getTasks();
  return dataFromFS;
});

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
  },
});

export default taskListSlice.reducer;
