import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, create } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

import Blogs from './components/Blogs';
import Notification from './components/Notification';
import CreateNewBlog from './components/CreateNewBlog';
import Togglable from './components/Togglable';

import loginService from './services/login';
import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');

      notify('logged in successfully');
    } catch (exception) {
      notify('wrong uesrname or password', 'error');
    }
  };

  const handleLogout = () => {
    userService.clearUser();
    dispatch(setUser(null));
    setUsername('');
    setPassword('');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const userLoggedIn = () => (
    <p>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  );

  const createBlogRef = useRef();

  const addBlog = async (blogObject) => {
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
        <h2>log in to application</h2>
        <Notification />
        {loginForm()}
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {userLoggedIn()}
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateNewBlog {...{ addBlog }} />
      </Togglable>
      <Blogs />
    </>
  );
};

export default App;
