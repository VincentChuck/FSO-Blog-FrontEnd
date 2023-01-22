import { useEffect, useState } from 'react';
import usersService from '../services/users';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
