import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    addLike(blog.id, newBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.author} <br/>
        {blog.user.username === user.username ?
          <button onClick={handleDelete}>remove</button> :
          null
        }
      </div>

    </div>
  )
}

export default Blog