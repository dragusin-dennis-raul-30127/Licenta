import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {GoogleMap, useLoadScript, Marker, MarkerF,InfoWindowF} from '@react-google-maps/api'
import axios from '../api/axios';




export default function Home(){
    const [data,setData]=useState([])
    const [borders,setBorders]=useState([])
    const navigate = useNavigate()
    const fetchBorders=async()=>{
        try{
            const response = await axios().get("api/borders")
            setBorders(response.data.data)
        }
        catch(error){}
    }

   useEffect(()=>{
        fetchBorders()
   },[])

  
    useEffect(() => {
        const token=localStorage.getItem('token')
        if (token) {
            const user =jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            } 
        }
        else{
          alert('N ai voie')
          navigate('/login')
        }
        
    })
   

   console.log(borders)

   
   const trucksBorders=borders.filter(border => border.areTrucksAllowed===true)
   const carsBorders=borders.filter(border => border.areCarsAllowed===true)
   
   useEffect(()=>{
    borders &&
    setData(borders)
   },[borders])
   
   

   

    const {isLoaded}=useLoadScript({
        googleMapsApiKey: "AIzaSyBFodgAyXyjij2e-8p9qsSoHn8m9mnzp5Q",
    })

    if(!isLoaded) {
        return <div>Loading...</div>
    }
    return <div>
        <button onClick={()=>setData(trucksBorders)}>Trucks</button>
        <button onClick={()=>setData(carsBorders)}> Cars </button>
                <Map  data={data}/>
             </div>
        
}
function Map({data}){
    const center = useMemo(() => ({ lat: 45,lng: 25}),[])
    const [selectedElement, setSelectedElement] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);
    const navigate = useNavigate()
    return (
        <GoogleMap 
        zoom={7} 
        center={center} 
        mapContainerStyle={{width: "100%" , height: "100vh"}}>
        
        {data.map(element => {
          return (
            <MarkerF
              key={element._id}
              title={element.name}
              position={{
                lat: element.latitude,
                lng: element.longitude,
              }}
              
              onClick={(props, marker) => {
                setSelectedElement(element);
                setActiveMarker(marker);
              }}
            />
          );
        })}
        {selectedElement ? (
          <InfoWindowF
            position={{lat:selectedElement.latitude, lng:selectedElement.longitude}}
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              <h1>{selectedElement.name}</h1>
              <button onClick={()=>navigate('/truckControls')}>Enter Truck Control</button>
              <button onClick={()=>navigate('/carControls')}>Enter Car Control</button>
              <button onClick={()=>navigate('/viewTruckControls')}>View Truck Controls</button>
              <button onClick={()=>navigate(`/viewControls/${selectedElement._id}`)}>View Car Controls</button>
            </div>
          </InfoWindowF>
        ) : null}      
        </GoogleMap>
    )
}

