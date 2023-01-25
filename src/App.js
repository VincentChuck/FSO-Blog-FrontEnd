import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeBlogs, create } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setUser } from './reducers/userReducer';
import { notify } from './reducers/notificationReducer';

import HomeView from './components/HomeView';
import UsersView from './components/UsersView';
import Blog from './components/Blog';
import User from './components/User';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import loginService from './services/login';
import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const createBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(setUser(user));
      notify('logged in successfully');
    } catch (exception) {
      notify('wrong username or password', 'error');
    }
  };

  const logout = () => {
    userService.clearUser();
    dispatch(setUser(null));
  };

  const createBlog = async (blogObject) => {
    try {
      dispatch(create(blogObject));
      createBlogRef.current.toggleVisibility();
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`);
    } catch (exception) {
      notify(`${exception.response.data.error}`, 'error');
    }
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.username} logged in
          <button onClick={logout}>logout</button>
        </div>

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/"
            element={
              <HomeView createBlogRef={createBlogRef} createBlog={createBlog} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
