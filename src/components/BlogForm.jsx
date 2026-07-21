import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import MuiStack from '@mui/material/Stack'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')

    navigate('/')
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 360, padding: 2 }}>
      <form onSubmit={addBlog}>
        <MuiStack spacing={2} direction="column">
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="author"
            variant="outlined"
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="url"
            variant="outlined"
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
          <Button variant="contained" type="submit">submit</Button>
        </MuiStack>
      </form>
    </Card>
  )
}

export default BlogForm