import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs( initialNotes )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    // try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogappuser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    // } catch (exception) {
    //   setErrorMessage('Wrong Credentials')
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappuser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    const blogCreatedRes = await blogService.create(newBlog)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setBlogs(blogs.concat(blogCreatedRes))
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2><form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const userLoggedIn = () => (
    <p>
      {user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </p>
  )

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createNewBlog= () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type='text'
            value={newBlogTitle}
            name='title'
            onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlogAuthor}
            name='author'
            onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
            type='url'
            value={newBlogUrl}
            name='url'
            onChange={({ target }) => setNewBlogUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )

  const appLayout = () => {
    if (user === null) {
      return loginForm()
    } else {
      return (
        <>
          <h2>blogs</h2>
          {userLoggedIn()}
          {createNewBlog()}
          {blogDisplay()}
        </>
      )
    }
  }

  return (
    <div>
      {appLayout()}
    </div>
  )
}

export default App
