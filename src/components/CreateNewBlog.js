import { useState } from 'react';
import { create } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const CreateNewBlog = ({ createBlogRef }) => {
  const dispatch = useDispatch();
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const handleNewBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    const createBlog = async (blogObject) => {
      dispatch(create(blogObject));
      createBlogRef.current.toggleVisibility();
    };

    createBlog(newBlog);

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="title"
            placeholder="title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="author"
            placeholder="author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={newBlogUrl}
            name="url"
            placeholder="url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateNewBlog;
