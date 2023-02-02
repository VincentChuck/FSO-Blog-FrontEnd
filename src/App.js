import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setUser, logout } from './reducers/userReducer';

import HomeView from './components/HomeView';
import UsersView from './components/UsersView';
import Blog from './components/Blog';
import User from './components/User';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const createBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());

    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="flex-col bg-gray-300 h-screen w-screen justify-items-center">
        <div className="max-w-screen-lg m-auto h-full bg-gray-200">
          <div className="flex items-center bg-white pr-2">
            <Link to="/">
              <div className="text-3xl bg-[#ff4500] hover:bg-[#f26b3a] text-white font-bold p-1 rounded-lg">
                blog app
              </div>
            </Link>
            <div className="flex flex-1 justify-between">
              <div className="flex items-center">
                <Link
                  to="/users"
                  className="ml-4 underline font-semibold hover:text-[#0079d3b3]"
                >
                  users
                </Link>
              </div>
              <div>
                {user ? (
                  <div className="flex items-center">
                    <div className="mx-2">{user.username} logged in</div>
                    <button
                      onClick={() => dispatch(logout())}
                      className="btn-blue"
                    >
                      logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="btn-blue">
                    login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Notification />

          <div className="p-2 flex-1">
            <Routes>
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/users" element={<UsersView />} />
              <Route
                path="/login"
                element={user ? <Navigate replace to="/" /> : <LoginForm />}
              />
              <Route
                path="/"
                element={<HomeView createBlogRef={createBlogRef} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
