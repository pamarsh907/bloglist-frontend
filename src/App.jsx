import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${username} logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      // const newBlogObj = {
      //   title: title,
      //   author: author,
      //   url: url
      // }
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      setNotification(`Added new blog: ${newBlog.title} by ${author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch {
      setErrorMessage('failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="on"
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => {
    return <>
      <h2>blog form</h2>
      <div>{user.username} logged in</div><button onClick={handleLogout}>logout</button>

      <form onSubmit={handleBlogCreation}>
        <div>
          <label>
            title
            <input 
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input 
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input 
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">submit</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  }

  return (
    <div>
      <h1>BLOGS APP</h1>
      <Error message={errorMessage} />
      <Notification message={notification} />
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App