//import logo from './logo.svg';

import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt from 'jsonwebtoken'
function App() {
  const navigate = useNavigate()
  const [border,setBorder]=useState('')
  const [name, setName]=useState('')
  const [licensePlate, setLicensePlate]=useState('')
  const [vinNumber, setVinNumber]=useState('')
  const [vehicleModel, setVehicleModel]=useState('')
  const [vehicleYear, setVehicleYear]=useState('')
  const [date, setDate]=useState('')
  const [problems, setProblems]=useState(false)
  const [problemDescription, setProblemDescription]=useState('')
 



  

  async function enterCarControl(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/carControls',{
      method: 'POST',
      headers:{
        
        'Content-Type': 'application/json',
        'authorization':  `Bearer ${localStorage.getItem('token')}` ,
      },
      body: JSON.stringify({
        border,
        name,
        licensePlate,
        vinNumber,
        vehicleModel,
        vehicleYear,
        date,
        problems,
        problemDescription
      }),
    })

    const data=await response.json()
    const token=localStorage.getItem('token')
    if(data.status === 'ok') {
      alert('Control entered succesfully')
      navigate('/dashboard')
    }
    else{
      if(!token){
        alert('You are not auth')
      }else{
        alert('Invalid control')
      }
      
    }
    console.log(data)
  }


  useEffect(() => {
    const token=localStorage.getItem('token')
    if (token) {
        const user =jwt.decode(token)
        if(!user){
            localStorage.removeItem('token')
            navigate('/')
        } else{
            enterCarControl()
        }
    }
    else{
      alert('N ai voie')
      navigate('/')
    }
    
})

  return (
    <div>
      <h1>Car Control</h1>
      <form onSubmit={enterCarControl}>
      <input 
          value={border}
          onChange={(e)=>setBorder(e.target.value)}
          type ="text" 
          placeholder="Border"
        />
        <br/>
        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type ="text" 
          placeholder="Name"
        />
        <br/>
        <input 
          value={licensePlate}
          onChange={(e)=>setLicensePlate(e.target.value)}
          type ="text" 
          placeholder="License Plate"
        />
        <br/>
        <input 
          value={vinNumber}
          onChange={(e)=>setVinNumber(e.target.value)}
          type ="text" 
          placeholder="VIN Number"
        />
        <br />
        <input 
          value={vehicleModel}
          onChange={(e)=>setVehicleModel(e.target.value)}
          type ="text" 
          placeholder="Vehicle Model"
        />
        <br />
        <input 
          value={vehicleYear}
          onChange={(e)=>setVehicleYear(e.target.value)}
          type ="text" 
          placeholder="Vehicle Year"
        />
        <br />
        <span>Problems</span>
        <input 
          value={problems}
          onChange={(e)=>setProblems(!problems)}
          type ="checkBox" 
          placeholder="Problems"
        />
        <br />
        {problems &&
        
        <input 
          value={problemDescription}
          onChange={(e)=>setProblemDescription(e.target.value)}
          type ="text" 
          placeholder="Problems Description"
          disabled={!problems}
        />}
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
