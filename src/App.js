import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([null, null])

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

    try {
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
    } catch (exception) {
      setNotification(['wrong username or password','error'])
      setTimeout(() => {
        setNotification([null,null])
      }, 5000)
    }
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
    console.log(blogCreatedRes.title)
    if (blogCreatedRes) {
      setNotification([`a new blog ${blogCreatedRes.title} added`, 'notification'])
      setTimeout(() => {
        setNotification([null,null])
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const notificationDisplay = () => {
    return notification[0] === null ?
      null :
      (
        <div className={notification[1]}>
          {notification[0]}
        </div>
      )
  }

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>
        {notificationDisplay()}
        {loginForm()}
      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>
        {notificationDisplay()}
        {userLoggedIn()}
        <Togglable buttonLabel="new blog">
          <CreateNewBlog
            { ... { handleNewBlog,
              newBlogTitle, setNewBlogTitle,
              newBlogAuthor, setNewBlogAuthor,
              newBlogUrl, setNewBlogUrl } }
          />
        </Togglable>
        {blogDisplay()}
      </>
    )
  }

}

export default App
