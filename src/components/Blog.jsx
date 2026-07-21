import { useState } from 'react'

const Blog = ({ blog, updateLikes, remove, canRemove, canLike }) => {
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

  const manageAddLike = async () => {
    console.log('manage add likes')
    try {
      await updateLikes(blog.id)
      setLikes(likes + 1)
    }
    catch(error) {
      console.log('error adding like: ', error)
    }
  }

  if(!blog) {
    return null
  }

  return (
    <div style={blogStyle}>
      <div className='blogTitle'>{blog.title} : {blog.author}</div>
      {showDetails && <>
        <div>{blog.url}</div>
        <div className='likes'>likes: {likes}{canLike && <button className='likeButton' onClick={manageAddLike}>like</button>}</div>
        <div>{blog.user?.username}</div>

        {canRemove && <button onClick={remove}>remove</button>}
      </>
      }
      <button className='toggleViewButton' onClick={toggleVisibility}>{showDetails ? 'hide' : 'view'}</button>
    </div>
  )
}

export default Blog