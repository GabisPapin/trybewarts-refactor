import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFeedbackSlice {
  comments: string;
}

const initialState: IFeedbackSlice = {
  comments: '',
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    saveComments: (state, action: PayloadAction<string>) => {
      state.comments = action.payload;
    },
  },
});

export const { saveComments } = feedbackSlice.actions;
export const feedbackReducer = feedbackSlice.reducer;
