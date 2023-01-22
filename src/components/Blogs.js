import { useSelector } from 'react-redux';

import Blog from './Blog';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  return (
    <div>
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
