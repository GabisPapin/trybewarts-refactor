import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './reducers/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { sessionApi } from '../service/httpService';

const rootReducer = combineReducers({
  user: UserReducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
