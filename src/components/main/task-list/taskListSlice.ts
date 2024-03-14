import { getAllTasks } from "@/api/tasks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TaskMetaData = {
  category?: string; // This will create the task under a category. Used to organise
  tags: string[]; // Array of tags. Can be used to search tasks
  priority: "HIGH" | "NORMAL" | "LOW"; // High, Medium, Low
  dueDate?: Date; // Date the task is due
  reminderDate?: Date; // Date the task is due
  description?: string; // Description of the task
  notes?: string; // Notes about the task
  attachments?: string[]; // Array of attachments. Can be used to download attachments
  completed: boolean; // Whether the task is completed or not
  completedDate?: Date; // Date the task was completed
  createdDate: Date; // Date the task was created
  updatedDate: Date; // Date the task was last updated
  id: string; // Unique ID of the task
  name: string; // Name of the task
  status?: string; // Status of the task. Can be used to filter tasks
  type?: string; // Type of the task. Can be used to filter tasks
  user: string; // User who created the task
};

export type TaskListState = {
  listLoading: boolean; // Whether the task list is loading or not
  taskList: TaskMetaData[];
  error: string; // Error message if the task list fails to load
};

const initialState: TaskListState = {
  listLoading: false,
  taskList: [],
  error: "",
};

export const fetchAllTasks = createAsyncThunk("taskList/fetchAllTasks", async () => {
  const data = await getAllTasks();
  return data;
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
