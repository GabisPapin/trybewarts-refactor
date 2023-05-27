import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IUserSliceState } from '../../interfaces/userInterfaces';

const initialState: IUserSliceState = {
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { saveEmail } = userSlice.actions;
export const UserReducer = userSlice.reducer;
