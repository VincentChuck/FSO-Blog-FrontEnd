import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <div className="blogs">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
