import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSliceState } from '../../interfaces/userInterfaces';

const initialState: IUserSliceState = {
  email: '',
  password: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    savePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { saveEmail, savePassword } = userSlice.actions;
export const UserReducer = userSlice.reducer;
