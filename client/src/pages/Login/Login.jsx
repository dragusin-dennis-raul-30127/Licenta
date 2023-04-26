//import logo from './logo.svg';

import {useState} from 'react'
import './Login.scss'

function App() {
  
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  async function loginUser(event){
    event.preventDefault()
    try{
      const response = await fetch('http://localhost:1337/api/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data=await response.json()
    console.log(data)

    if(data.user){
      localStorage.setItem('token',data.user)
      alert('Login successful')
      window.location.href='/dashboard'
    }else{
      alert('Please check your username and password')
    }
    }
    catch(err){
      console.log(err)
    }
   
  }

  return (
    <div className="login-container">
      <h1 className="title-container">Login</h1>
    <div className="form-container">
      <form   onSubmit={loginUser}>
        <input className="input-details"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type ="text" 
          placeholder="Email"
        />
        <br/>
        <input className="input-details"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type ="text" 
          placeholder="Password"
        />
        <br/>
        <input  className="submit-details" type="submit" value="Login"
        />
      </form>
      </div>
    </div>
  );
}

export default App;
