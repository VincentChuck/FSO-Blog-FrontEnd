import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UsersView = () => {
  const users = useSelector((state) => state.users);

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
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
