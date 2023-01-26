import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/user';
import { notify } from '../reducers/notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(setUser(user));
      dispatch(notify('logged in successfully'));
    } catch (exception) {
      dispatch(notify('wrong username or password', 'error'));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    userService.clearUser();
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
