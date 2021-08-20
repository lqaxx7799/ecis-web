import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer, { AuthenticationActionTypes } from '../common/reducers/authentication.reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return [thunk];
  }
  return [thunk, createLogger()];
};

const enhancer = composeWithDevTools(applyMiddleware(...getMiddleware()));

const allReducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(allReducers, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppActions =
  | AuthenticationActionTypes;

export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
