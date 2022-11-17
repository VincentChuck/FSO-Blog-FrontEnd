import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  'title': 'test authorization to delete blog',
  'author': 'VC',
  'url': 'http://testfrontend.com',
  'likes': 111,
  'user': 'vccc'
}

describe('each blog', () => {
  let container
  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('renders title and author only by default', () => {
    const defaultView = container.querySelector('.defaultView')

    //renders title and author
    expect(defaultView).toHaveTextContent(blog.title)
    expect(defaultView).toHaveTextContent(blog.author)

    //does not render url and number of likes
    expect(defaultView).not.toHaveTextContent(blog.url)
    expect(defaultView).not.toHaveTextContent(blog.likes)

    //section that displays full details of the blog is not expanded
    const expandedView = container.querySelector('.expandedView')
    expect(expandedView).toHaveStyle('display: none')
  })

  test('renders url and likes when view button pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const defaultView = container.querySelector('.defaultView')
    expect(defaultView).toHaveStyle('display: none')

    const expandedView = container.querySelector('.expandedView')

    //blog details section is expanded
    expect(expandedView).not.toHaveStyle('display: none')

    //blog details are shown
    expect(expandedView).toHaveTextContent(blog.title)
    expect(expandedView).toHaveTextContent(blog.author)
    expect(expandedView).toHaveTextContent(blog.url)
    expect(expandedView).toHaveTextContent(blog.likes)
  })
})