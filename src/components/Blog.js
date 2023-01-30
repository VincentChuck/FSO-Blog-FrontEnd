import { useDispatch, useSelector } from 'react-redux';
import { like, remove } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogID = useParams().id;
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(like(blog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(remove(blog));
    }
  };

  const blog = blogs.find((blog) => blog.id === blogID);
  if (!blog) {
    return null;
  }

  const showDel = blog.user.username === user.username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} style={{ display: 'block' }}>
        {blog.url}
      </a>
      <span className="likes">{blog.likes} likes</span>{' '}
      <button onClick={handleLike} className="like">
        like
      </button>
      <span style={{ display: 'block' }}>added by {blog.user.username}</span>
      {showDel ? <button onClick={handleDelete}>remove</button> : null}
      <h3>comments</h3>
      <ul>
        {[...blog.comments].map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
