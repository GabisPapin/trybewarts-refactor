import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  email: string;
}

const initialState: IUserState = {
  email: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { saveEmail } = usersSlice.actions;
export const userReducer = usersSlice.reducer;
