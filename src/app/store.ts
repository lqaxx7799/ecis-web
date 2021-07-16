import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import authReducer from '../store/authSlice';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return [];
  }
  return [createLogger()];
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
