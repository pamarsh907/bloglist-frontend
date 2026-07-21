import { useNavigate } from 'react-router-dom'

const LogoutForm = ({ logout }) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('calling logout')
    logout()
    navigate('/')
  }


  return (
    <button type="submit" onClick={handleLogout}>logout</button>
  )
}

export default LogoutForm