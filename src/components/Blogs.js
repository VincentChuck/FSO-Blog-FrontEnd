import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      <div className="blogs">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              showDel={blog.user.username === user.username}
            />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
