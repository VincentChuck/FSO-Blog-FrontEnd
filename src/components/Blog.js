import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} <button>like</button> <br/>
        {blog.author}
      </div>

    </div>
  )
}

export default Blog