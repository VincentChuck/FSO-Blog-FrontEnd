import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="username"
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          className="input"
          placeholder="password"
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button id="login-button" className="btn-blue mt-1" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
