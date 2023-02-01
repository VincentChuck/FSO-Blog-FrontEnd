import { useDispatch, useSelector } from 'react-redux';
import { like, remove, addComment } from '../reducers/blogReducer';
import { useParams, useNavigate } from 'react-router-dom';

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogID = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    dispatch(like(blog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(remove(blog));
      navigate('/');
    }
  };

  const blog = blogs.find((blog) => blog.id === blogID);
  if (!blog) {
    return null;
  }

  const showDel = user && blog.user.username === user.username;

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = '';
    dispatch(addComment(blog, comment));
  };

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
      <form onSubmit={handleComment}>
        <input type="text" name="comment" />
        <button type="submit"> add comment</button>
      </form>
      <ul>
        {[...blog.comments].map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
