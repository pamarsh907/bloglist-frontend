import { useState} from 'react'

const LoginForm = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        try{       
            login(username, password)
        } catch(error) {
            console.log('error :', error)
        }

        setUsername('')
        setPassword('')
    }

    return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="on"
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm