//import logo from './logo.svg';

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function App() {
  const history = useNavigate()
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [badgeNumber, setBadgeNumber]=useState('')
  const [password, setPassword]=useState('')
  const [isAdmin, setIsAdmin]=useState(false)

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register',{
      method: 'POST',
      headers:{
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

    const data=await response.json()

    if(data.status === 'ok') {
      history('/login')
    }
    console.log(data)
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type ="text" 
          placeholder="Name"
        />
        <br/>
        <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type ="text" 
          placeholder="Email"
        />
        <br/>
        <input 
          value={badgeNumber}
          onChange={(e)=>setBadgeNumber(e.target.value)}
          type ="text" 
          placeholder="Badge Number"
        />
        <br/>
        <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type ="text" 
          placeholder="Password"
        />
        <br />
        <span>Admin</span>
        <input 
          value={isAdmin}
          onChange={(e)=>setIsAdmin(e.target.value)}
          type ="checkBox" 
          placeholder="Admin"
        />
        <br />
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default App;
