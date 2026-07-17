import { useState } from 'react'

const Blog = ({ blog, updateLikes, remove, canRemove }) => {
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
    setLikes(likes + 1)
    updateLikes(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} : {blog.author}</div>
      {showDetails && <>
        <div>{blog.url}</div>
        <div>likes: {likes}<button onClick={manageAddLike}>like</button></div>
        <div>{blog.user?.username}</div>

        {canRemove && <button onClick={remove}>remove</button>}
      </>
      }
      <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button>
    </div>
  )
}

export default Blog