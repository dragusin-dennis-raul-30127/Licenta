//import logo from './logo.svg';

import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt from 'jsonwebtoken'
function App() {
  const navigate = useNavigate()
  const [name, setName]=useState('')
  const [licensePlate, setLicensePlate]=useState('')
  const [vinNumber, setVinNumber]=useState('')
  const [vehicleModel, setVehicleModel]=useState('')
  const [vehicleYear, setVehicleYear]=useState('')
  const [date, setDate]=useState('')
  const [weight, setWeight]=useState('')
  const [height, setHeight]=useState('')
  const [width, setWidth]=useState('')
  const [length, setLength]=useState('')
  const [problems, setProblems]=useState(false)
  const [problemDescription, setProblemDescription]=useState('')
  useEffect(()=>{
    console.log(problems)
  },[problems])

  async function enterTruckControl(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/truckControls',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'authorization':  `Bearer ${localStorage.getItem('token')}` ,
      },
      body: JSON.stringify({
        name,
        licensePlate,
        vinNumber,
        vehicleModel,
        vehicleYear,
        date,
        weight,
        height,
        width,
        length,
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
            navigate('/login')
        } else{
            enterTruckControl()
        }
    }
    else{
      alert('N ai voie')
      navigate('/login')
    }
    
})

  return (
    <div>
      <h1>Truck Control</h1>
      <form onSubmit={enterTruckControl}>
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
        <input 
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
          type ="text" 
          placeholder="Weight"
        />
        <br />
        <input 
          value={height}
          onChange={(e)=>setHeight(e.target.value)}
          type ="text" 
          placeholder="Height"
        />
        <br />
        <input 
          value={width}
          onChange={(e)=>setWidth(e.target.value)}
          type ="text" 
          placeholder="Width"
        />
        <br />
        <input 
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          type ="text" 
          placeholder="Length"
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
