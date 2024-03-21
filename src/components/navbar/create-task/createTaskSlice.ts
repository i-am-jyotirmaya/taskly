import { TasksAPI } from "@/api/tasks";
import { TaskSchema } from "@/schemas/task";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// type TaskMetaData = {
//   category?: string; // This will create the task under a category. Used to organise
//   tags: string[]; // Array of tags. Can be used to search tasks
//   priority: "HIGH" | "NORMAL" | "LOW"; // High, Medium, Low
//   dueDate?: Date; // Date the task is due
//   reminderDate?: Date; // Date the task is due
//   description?: string; // Description of the task
//   notes?: string; // Notes about the task
//   attachments?: string[]; // Array of attachments. Can be used to download attachments
//   completed: boolean; // Whether the task is completed or not
//   completedDate?: Date; // Date the task was completed
//   createdDate: Date; // Date the task was created
//   updatedDate: Date; // Date the task was last updated
//   id: string; // Unique ID of the task
//   name: string; // Name of the task
//   status?: string; // Status of the task. Can be used to filter tasks
//   type?: string; // Type of the task. Can be used to filter tasks
//   user: string; // User who created the task
// };

export type CreateTaskState = {
  submitting: boolean; // Whether the task list is loading or not
  error: string; // Error message if the task list fails to load
};

const initialState: CreateTaskState = {
  submitting: false,
  error: "",
};

export const createTask = createAsyncThunk(
  "CreateTasks/CreateTasks",
  async (task: TaskSchema) => {
    await TasksAPI.createTask(task);
  }
);

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
