import { TasksAPI } from "@/api/tasks.api";
import { TaskSchema } from "@/schemas/task-schema";
import { createSlice } from "@reduxjs/toolkit";
import { deleteTask, finishTask } from "@/components/main/task-item/taskItemSlice";
import { createAppAsyncThunk } from "@/redux/utils";
import messages from "@/static/messages-c.json";

type MessagePart = {
  text: string;
  emoticon?: string; // Emoticon is optional
};

export type TaskListState = {
  listLoading: boolean; // Whether the task list is loading or not
  taskList: TaskSchema[];
  message: MessagePart[]; // Message if no tasks on screen
  error: string; // Error message if the task list fails to load
  groupBy: "category" | "priority" | ""; // The property to group the tasks by
  // sortBy: "asc" | "desc"; // The sort order of the tasks
  // filterBy: string; // The filter string to apply to the tasks
  // selectedCategory: string; // The selected category to filter the tasks by
  // selectedPriority: string; // The selected priority to filter the tasks by
  // selectedDueDate: string; // The selected due date to filter the tasks by
  // selectedTask: TaskSchema | null; // The selected task to display in the task item component
  // selectedTaskIndex: number; // The index of the selected task in the task list
  // selectedTaskList: TaskSchema[]; // The list of tasks to display in the task list component
  // selectedTaskListIndex: number; // The index of the selected task list in the task list component
  // selectedTaskListName: string; // The name of the selected task list in the task list component
  // selectedTaskListId: string; // The ID of the selected task list in the task list component
};

const initialState: TaskListState = {
  listLoading: false,
  taskList: [],
  error: "",
  message: [],
  groupBy: "",
};

const selectRandomFromList = <T>(list: T[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const fetchAllTasks = createAppAsyncThunk("taskList/fetchAllTasks", async (_, thunkAPI) => {
  const selectedCategory = thunkAPI.getState().sideBar.selectedCategory;
  console.log(selectedCategory);
  const dataFromFS = await TasksAPI.getTasks();

  let filtered;
  switch (selectedCategory) {
    case "star":
      filtered = dataFromFS;
      break;
    case "day":
      filtered = dataFromFS.filter((task) => {
        if (!task.dueDate) return false; // If the task doesn't have a due date, return false
        const day = new Date(task.dueDate!).toDateString();
        const today = new Date().toDateString();
        return day === today;
      });
      break;
    case "important":
      filtered = dataFromFS.filter((task) => task.priority.toLowerCase() === "high");
      break;
    default:
      filtered = dataFromFS;
  }

  if (!filtered.length) {
    thunkAPI.dispatch(setMessage(selectRandomFromList(messages[selectedCategory])));
  }

  return filtered;
});

// export const deleteTask = createAsyncThunk("taskList/deleteTask", async (id: string) => {
//   return await TasksAPI.deleteTask(id);
// });

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
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
    builder.addCase(finishTask.fulfilled, (state, action) => {
      const index = state.taskList.findIndex((task) => task.id === action.payload.id);
      state.taskList[index] = action.payload;
    });
  },
});

export const { setGroupBy, setMessage } = taskListSlice.actions;

export default taskListSlice.reducer;
