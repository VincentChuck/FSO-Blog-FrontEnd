import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <div className="blogs">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <NavLink
              key={blog.id}
              to={`/blogs/${blog.id}`}
              className="block bg-white py-3 px-2 mb-2 rounded-sm max-w-screen-md border border-gray-400 hover:border-gray-500"
            >
              {blog.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
