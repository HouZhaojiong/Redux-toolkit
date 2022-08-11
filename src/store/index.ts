import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slice/postsSlice';
import usersReducer from './slice/usersSlice';
import notificationsReducer from './slice/notificationsSlice';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
