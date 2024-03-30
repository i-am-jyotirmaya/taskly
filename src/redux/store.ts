import { configureStore } from "@reduxjs/toolkit";
import taskListChangeSelectorReducer from "@/components/main/task-list-mode-selector/taskListModeSelectorSlice";
import taskListReducer from "@/features/taskList/taskListSlice";
import createTaskReducer from "@/components/navbar/create-task/createTaskSlice";
import taskItemReducer from "@/components/main/task-item/taskItemSlice";
import sideBarReducer from "@/features/sideBar/sideBarSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    taskListChangeSelector: taskListChangeSelectorReducer,
    taskList: taskListReducer,
    createTask: createTaskReducer,
    taskItem: taskItemReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
