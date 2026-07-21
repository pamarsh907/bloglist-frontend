import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import MuiStack from '@mui/material/Stack'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    try{
      login(username, password)
    } catch(error) {
      console.log('error :', error)
    }

    setUsername('')
    setPassword('')

    navigate('/')
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 360, padding: 2 }}>
      <Box>
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <MuiStack spacing={2} direction="column">
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete='on'
            />
            <Button variant="contained" type="submit">login</Button>
          </MuiStack>
        </form>
      </Box>
    </Card>
  )
}

export default LoginForm