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
        <input
          type="text"
          value={newBlogTitle}
          name="title"
          placeholder="title"
          className="input"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
        <input
          type="text"
          value={newBlogAuthor}
          name="author"
          placeholder="author"
          className="input"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
        <input
          type="url"
          value={newBlogUrl}
          name="url"
          placeholder="url"
          className="input"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
        <button className="btn-blue mt-1" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default CreateNewBlog;
