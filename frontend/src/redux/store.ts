import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'redux/reducers/usersSlice';
import { sessionApi } from 'shared/httpService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sessionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
