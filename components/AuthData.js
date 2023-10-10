import { useState } from 'react'
// import { API_URL } from '../config'
import styles from '@/styles/Form.module.css'
import { getStoredAuth, storeAuthData } from '../utils/auth/Auth'

function AuthData({ setShowModal }) {
  const authData = getStoredAuth()
  const [apiUrl, setApiUrl] = useState(authData.apiUrl)
  const [username, setUsername] = useState(authData.username)
  const [password, setPassword] = useState(authData.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    storeAuthData({
      apiUrl,
      username,
      password,
    })
    setShowModal(false)
  }

  return (
    <div className={styles.form}>
      <h1>Auth Data Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='apiUrl'>API URL</label>
          <input
            type='text'
            id='apiUrl'
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='username'>User ID</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Save'
          className='btn'
        />
      </form>
    </div>
  )
}

export default AuthData
