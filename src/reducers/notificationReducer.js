import { createSlice } from '@reduxjs/toolkit';

const initialState = { content: null, type: null };
let timeoutID;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const showNotification = (content, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(content));

    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(setNotification(initialState));
    }, duration);
  };
};

export default notificationSlice.reducer;
