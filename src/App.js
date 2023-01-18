import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, create } from './reducers/blogReducer';

import Blogs from './components/Blogs';
import Notification from './components/Notification';
import CreateNewBlog from './components/CreateNewBlog';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(
        showNotification(
          {
            content: 'logged in successfully',
            type: 'notification',
          },
          5000
        )
      );
    } catch (exception) {
      dispatch(
        showNotification(
          {
            content: 'wrong username or password',
            type: 'error',
          },
          5000
        )
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
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

      dispatch(
        showNotification(
          {
            content: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type: 'notification',
          },
          5000
        )
      );
    } catch (exception) {
      dispatch(
        showNotification(
          {
            content: `${exception.response.data.error}`,
            type: 'error',
          },
          5000
        )
      );
    }
  };

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        {loginForm()}
      </>
    );
  } else {
    return (
      <>
        <h2>blogs</h2>
        <Notification />
        {userLoggedIn()}
        <Togglable buttonLabel="new blog" ref={createBlogRef}>
          <CreateNewBlog {...{ addBlog }} />
        </Togglable>
        <Blogs user={user} />
      </>
    );
  }
};

export default App;
