import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const manageAddLike = () => {
    const newBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      blogService.update(blog.id, newBlog)
    } catch(error) {
      console.log('error adding likes:', error)
    }
    console.log('setting likes')
    setLikes(likes + 1)

    updateLikes()
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} : {blog.author}</div>
      {showDetails && <>
        <div>{blog.url}</div>
        <div>likes: {likes}<button onClick={manageAddLike}>like</button></div>
        <div>{blog.user?.username}</div>
        </>
      }
      <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button> 
    </div>
  )
}

export default Blog