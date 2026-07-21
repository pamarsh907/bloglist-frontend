import { Link } from 'react-router-dom'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Link as RouterLink } from 'react-router-dom'
import List from '@mui/material/List'


const BlogsList = ({ blogs }) => {
  return <List sx={{ bgcolor: 'background.paper' }}>
    {blogs.map(blog => (
      <ListItemButton key={blog.id} component={RouterLink} to={`/blogs/${blog.id}`}>
        <ListItemText primary={blog.title} />
      </ListItemButton>))}
  </List>
}

export default BlogsList