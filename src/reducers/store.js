import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer';

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
});

export default store;
