import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
      setNotification(['logged in successfully','notification'])
      setTimeout(() => {
        setNotification([null,null])
      }, 5000)
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="login-button" type='submit'>login</button>
    </form>
  )

  const userLoggedIn = () => (
    <p>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  )

  const blogDisplay = () => (
    <div className='blogs'>
      <h2>blogs</h2>
      {blogs.sort((a,b) => b.likes - a.likes ).map(blog =>
        <Blog key={blog.id} {...{ blog, addLike, removeBlog }}
          showDel={blog.user.username===user.username}
        />
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

  const createBlogRef = useRef()

  const addBlog = async (blogObject) => {
    try{
      const blogCreatedRes = await blogService.create(blogObject)
      createBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(blogCreatedRes))

      setNotification([`a new blog ${blogCreatedRes.title} by ${blogCreatedRes.author} added`, 'notification'])
      setTimeout(() => {
        setNotification([null,null])
      }, 5000)
    } catch (exception) {
      setNotification([`${exception.response.data.error}`, 'error'])
      setTimeout(() => {
        setNotification([null,null])
      }, 5000)
    }
  }

  const addLike = async (id, blogObject) => {
    const blogUpdatedRes = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id === id ? blogUpdatedRes : blog))
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
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
        <Togglable buttonLabel='new blog' ref={createBlogRef}>
          <CreateNewBlog { ...{ addBlog } } />
        </Togglable>
        {blogDisplay()}
      </>
    )
  }

}

export default App
