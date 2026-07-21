import { Link } from 'react-router-dom'

const BlogsList = ({ blogs }) => {
  return blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)
}

export default BlogsList