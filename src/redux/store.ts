import { configureStore } from "@reduxjs/toolkit";
import taskListChangeSelectorReducer from "@/components/main/task-list-mode-selector/taskListModeSelectorSlice";
import taskListReducer from "@/components/main/task-list/taskListSlice";

export const store = configureStore({
  reducer: {
    taskListChangeSelector: taskListChangeSelectorReducer,
    taskList: taskListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;