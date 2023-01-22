import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, create } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import HomeView from './components/HomeView';
import UsersView from './components/UsersView';
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

  const notify = (message, type = 'info') => {
    dispatch(showNotification({ content: message, type }, 5000));
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
          <Route
            path="/"
            element={
              <HomeView createBlogRef={createBlogRef} createBlog={createBlog} />
            }
          />
          <Route path="/users" element={<UsersView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
