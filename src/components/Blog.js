import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { like, remove } from '../reducers/blogReducer';

const Blog = ({ blog, showDel }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? 'none' : '' };
  const showWhenVisible = { display: blogVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const handleLike = () => {
    dispatch(like(blog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(remove(blog));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="defaultView">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible} className="expandedView">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <span style={{ display: 'block' }}> {blog.url} </span>
        likes <span className="likes">{blog.likes}</span>{' '}
        <button onClick={handleLike} className="like">
          like
        </button>
        <span style={{ display: 'block' }}> {blog.user.username} </span>
        {showDel ? <button onClick={handleDelete}>remove</button> : null}
      </div>
    </div>
  );
};

export default Blog;
