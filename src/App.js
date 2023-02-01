import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

  // if (user === null) {
  //   return (
  //     <>
  //       <Notification />
  //       <LoginForm />
  //     </>
  //   );
  // }

  return (
    <Router>
      <div>
        <div>
          <h1 className="text-3xl text-white font-bold bg-[#ff4500]">
            blog app
          </h1>
          <div className="">
            <Link style={{ paddingRight: 5 }} to="/">
              blogs
            </Link>
            <Link style={{ paddingRight: 5 }} to="/users">
              users
            </Link>
          </div>
          <div>
            {user ? (
              <div>
                <div>{user.username} logged in</div>
                <button onClick={() => dispatch(logout())} className="btn-red">
                  logout
                </button>
              </div>
            ) : (
              <Link style={{ paddingRight: 5 }} to="/login">
                login
              </Link>
            )}
          </div>
        </div>

        <Notification />

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={<HomeView createBlogRef={createBlogRef} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
