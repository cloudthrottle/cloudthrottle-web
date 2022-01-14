import { configureStore } from '@reduxjs/toolkit'
import locosReducer from "./slices/LocosSlice";

export const store = configureStore({
  reducer: {
    locos: locosReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
