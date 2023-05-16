//import logo from './logo.svg';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./CarControl.scss"
function App() {
  const navigate = useNavigate()
  const [border, setBorder] = useState('')
  const [name, setName] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [vinNumber, setVinNumber] = useState('')
  const [isEntering, setIsEntering] = useState(false)
  const [vehicleModel, setVehicleModel] = useState('')
  const [vehicleYear, setVehicleYear] = useState('')
  const [date, setDate] = useState('')
  const [problems, setProblems] = useState(false)
  const [problemDescription, setProblemDescription] = useState('')






  async function enterCarControl(event) {
     event.preventDefault()
    const response = await fetch('http://localhost:1337/api/carControls', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        border,
        name,
        licensePlate,
        vinNumber,
        isEntering,
        vehicleModel,
        vehicleYear,
        date,
        problems,
        problemDescription
      }),
    })

    const data = await response.json()
    if (data.status === 'ok') {
      alert('Control entered succesfully')
      navigate('/dashboard')
    }
    else {

      alert('Invalid control')


    }
    console.log(data)
  }


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('N ai voie')
      navigate('/')
    }

  })

  return (
    // <div className="wrapper-car-control">
      <div className="login-container">
        <h1 className="title-container">Car Control</h1>
        <div className="form-container">
          <form onSubmit={enterCarControl}>
            <div>Border </div>
            <div>
              <input className="input-details"
                value={border}
                onChange={(e) => setBorder(e.target.value)}
                type="text"
              />
            </div>
            <div>Name</div>
            <div>
              <input className="input-details"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div>LicensePlate</div>
            <div>
              <input className="input-details"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                type="text"
              />
            </div>
            <div>VIN Number</div>
            <div>
              <input className="input-details"
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value)}
                type="text"

              />
            </div>
            <div>Entering the country</div>
            <div>
              <input className="input-details"
                value={isEntering}
                onChange={(e) => setIsEntering(!isEntering)}
                type="checkbox"

              />
            </div>
            <div>Vehicle Model</div>
            <div>
              <input className="input-details"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                type="text"
              />
            </div>
            <div>Vehicle Year</div>
            <div>
              <input className="input-details"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                type="text"
              />
            </div>
            <div>Problems</div>
            <div>
              <input className="input-details"
                value={problems}
                onChange={(e) => setProblems(!problems)}
                type="checkBox"
              />
            </div>
            {problems &&
              <div>
                <div>Problems Description</div>
                <div>
                  <input className="input-details"
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    type="text"

                    disabled={!problems}
                  />
                </div>

              </div>
            }
            <input className="submit-details" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    // </div>
  );
}

export default App;
