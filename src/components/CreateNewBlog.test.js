import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNewBlog from './CreateNewBlog';

test('CreateNewBlog form calls event handler with right details when creating new blog', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<CreateNewBlog addBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const sendButton = screen.getByText('create');

  const blog = {
    title: 'testing CreateNewBlog component',
    author: 'sampleAuthor',
    url: 'http://sampleUrl.com',
  };

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  for (let key in blog) {
    expect(createBlog.mock.calls[0][0][key]).toBe(blog[key]);
  }
});
