import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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

  const handleLike = (event) => {
    event.preventDefault()

    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    addLike(blog.id, newBlog)

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
        {blog.author}
      </div>

    </div>
  )
}

export default Blog