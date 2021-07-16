import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Account from '../types/Account';

export interface AuthState {
  account: Account | null;
};

const initialState: AuthState = {
  account: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
});

export default authSlice.reducer;