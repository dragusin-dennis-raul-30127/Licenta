//import logo from './logo.svg';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.scss'

function App() {
  const history = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [badgeNumber, setBadgeNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        badgeNumber,
        password,
        isAdmin
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      history('/')
    }
    console.log(data)
  }

  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])

  return (
    <div className="wrapper-register">
      <div className="form-container">
        <div className="title-details">
          <h1>Register</h1>
        </div>

        <div className="form-details">
          <div className="register-left-side">
            <div>Name </div>
            <div>Email </div>
            <div>Badge Number </div>
            <div>Password </div>
            <div>Admin </div>
          </div>

          <form onSubmit={registerUser}>
            <div className="register-right-side">
              <div>
                <input className="input-details"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"

                />
              </div>
              <div>
                <input className="input-details"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"

                />
              </div>
              <div>
                <input className="input-details"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  type="text"

                />
              </div>
              <div>
                <input className="input-details"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"

                />
              </div>
              <div>
                <input className="input-details"
                  value={isAdmin}
                  onChange={() => setIsAdmin(!(isAdmin))}
                  type="checkBox"

                />
              </div>

            </div>
            <div>
              <input className="submit-details" type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default App;
