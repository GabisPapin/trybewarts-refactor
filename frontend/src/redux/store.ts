import { configureStore } from '@reduxjs/toolkit';
import { feedbackReducer } from 'redux/reducers/feedbackSlice';
import { userReducer } from 'redux/reducers/usersSlice';
import { feedbackApi, sessionApi } from 'shared/httpService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    feedbacks: feedbackReducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sessionApi.middleware, feedbackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
