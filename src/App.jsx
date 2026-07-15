import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      console.log('user :', user)
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
    
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogCreation = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
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
    <Togglable buttonLabel='Login'>
      <Login login={handleLogin}/>
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Add Blog'>
      <BlogForm createBlog={handleBlogCreation}/>
    </Togglable>  
  )

  const logoutForm = () => (
    <div><span>{user.username} is logged in</span><button onClick={handleLogout}>logout</button></div>
  )

  return (
    <div>
      <h1>BLOGS APP</h1>
      <Error message={errorMessage} />
      <Notification message={notification} />
      {!user && loginForm()}
      {user && logoutForm()}
      {user && blogForm()}
      {user && blogs.map(blog => <Blog blog={blog}/>)}

    </div>
  )
}

export default App