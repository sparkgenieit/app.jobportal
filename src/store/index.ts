import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './generalSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
