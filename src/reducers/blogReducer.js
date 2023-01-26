import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { notify } from '../reducers/notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    likeBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((a) => (a.id === updatedBlog.id ? updatedBlog : a));
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload;
      return state.filter((a) => a.id !== blogToRemove.id);
    },
    addBlog(state, action) {
      const newBlog = action.payload;
      state.push(newBlog);
    },
  },
});

export const { setBlogs, addBlog, likeBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const like = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(blog.id, likedBlog);
    dispatch(likeBlog(updatedBlog));
  };
};

export const remove = (blog) => {
  return (dispatch) => {
    blogService.remove(blog.id).then(() => dispatch(removeBlog(blog)));
  };
};

export const create = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
      dispatch(notify(`a new blog ${blog.title} by ${blog.author} added`));
    } catch (exception) {
      dispatch(notify(exception.response.data.error, 'error'));
    }
  };
};

export default blogSlice.reducer;
