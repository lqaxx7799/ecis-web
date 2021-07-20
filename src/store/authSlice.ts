import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../types/models';

export interface AuthState {
  account: Account | null;
  test: string;
};

const initialState: AuthState = {
  account: null,
  test: 'hihi',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;