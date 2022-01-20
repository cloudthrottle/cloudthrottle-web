import { configureStore } from '@reduxjs/toolkit'
import locosReducer from "./slices/LocosSlice";
import communicationsReducer from "./slices/CommunicationsSlice";
import powersReducer from "./slices/PowerSlice";

export const store = configureStore({
  reducer: {
    locos: locosReducer,
    communications: communicationsReducer,
    powers: powersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
