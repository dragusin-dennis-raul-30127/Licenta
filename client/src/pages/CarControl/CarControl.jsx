//import logo from './logo.svg';

import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import "./CarControl.scss"
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
    <div className="wrapper-car-control">
      <div className="form-container">
        <div className="title-details">
          <h1>Car Control</h1>
        </div>
        <div className="form-details">
          <form onSubmit={enterCarControl}>
            <div>Border </div>
              <div>
                <input className="input-details"
                  value={border}
                  onChange={(e)=>setBorder(e.target.value)}
                  type ="text" 
                />
              </div>
                <div>Name</div>
                  <div>
                    <input className="input-details"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      type ="text" 
                    />
                  </div>
                    <div>LicensePlate</div>
                      <div>
                        <input className="input-details"
                          value={licensePlate}
                          onChange={(e)=>setLicensePlate(e.target.value)}
                          type ="text" 
                        />
                      </div>
                        <div>VIN Number</div>
                          <div>
                            <input className="input-details"
                              value={vinNumber}
                              onChange={(e)=>setVinNumber(e.target.value)}
                              type ="text" 
                
                            />
                          </div>
                            <div>Vehicle Model</div>
                              <div>
                                <input className="input-details"
                                  value={vehicleModel}
                                  onChange={(e)=>setVehicleModel(e.target.value)}
                                  type ="text" 
                                />
                              </div>
                                <div>Vehicle Year</div>
                                  <div>
                                    <input className="input-details"
                                      value={vehicleYear}
                                      onChange={(e)=>setVehicleYear(e.target.value)}
                                      type ="text" 
                                    />
                                  </div>
                                    <div>Problems</div>
                                      <div>
                                        <input className="input-details"
                                          value={problems}
                                          onChange={(e)=>setProblems(!problems)}
                                          type ="checkBox" 
                                        />
                                      </div> 
                                      {problems &&
                                        <div>
                                          <div>Problems Description</div>
                                            <div>
                                              <input className="input-details"
                                                value={problemDescription}
                                                onChange={(e)=>setProblemDescription(e.target.value)}
                                                type ="text" 
                                                
                                                disabled={!problems}
                                              />
                                            </div>
                                          
                                        </div>
                                      }
                                      <input className="submit-details" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
