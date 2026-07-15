import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

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

  return (
    <div style={blogStyle}>
      <div>{blog.title} : {blog.author}</div>
      {showDetails && <>
        <div>{blog.url}</div>
        <div>likes: {blog.likes}<button>like</button></div>
        <div>{blog.user?.username}</div>
        </>
      }
      <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button> 
    </div>
  )
}

export default Blog