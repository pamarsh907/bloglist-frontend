import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

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
        url: url,
        user: user.id
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

  const handleUpdateLikes = (id) => {
    const updatedBlogs = blogs.map(blog => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog)
    setBlogs(updatedBlogs)

    const updatedBlog = updatedBlogs.find(blog => blog.id === id)

    const processed = {
      title: updatedBlog.title,
      author: updatedBlog.author,
      id: updatedBlog.id,
      likes: updatedBlog.likes,
      url: updatedBlog.url,
      user: updatedBlog.user.id
    }

    try {
      blogService.update(id, processed)
    } catch(error) {
      console.log('error adding likes:', error)
    }
  }

  const handleOnRemove = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`do you really want to delete ${blog.title}`)){
      try {
        await blogService.remove(id)
      } catch {
        setErrorMessage('failed to delete blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      setNotification(`Deleted blog: ${blog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const loginForm = () => (
    // <Togglable buttonLabel='Login'>
    //   <Login login={handleLogin}/>
    // </Togglable>

    <Login login={handleLogin}/>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Add Blog'>
      <BlogForm createBlog={handleBlogCreation}/>
    </Togglable>
  )

  const UserInfo = () => {
    // <div><span>{user.username} is logged in</span><button onClick={handleLogout}>logout</button></div>
    return user && <div><span>{user.username} is logged in</span></div>
  }

  const padding = {
    padding: 5
  }



  return (
    <Router>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        {!user &&<Link style={padding} to='/login'>login</Link>}
        {user && <Logout logout={handleLogout}/>}
      </div>
      <UserInfo/>
      <h1>BLOGS APP</h1>
      <Error message={errorMessage} />
      <Notification message={notification} />
      <Routes>
        <Route path='/login' element={
          loginForm()
        } />
        <Route path='/' element={
          <div className='blogsList'>
            {user && sortedBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={() => handleUpdateLikes(blog.id)}
                remove={() => handleOnRemove(blog.id)}
                canRemove={blog.user.id === user.id}
              />
            )}
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App