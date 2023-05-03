import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {GoogleMap, useLoadScript, Marker, MarkerF,InfoWindowF} from '@react-google-maps/api'
import axios from '../../api/axios';
import "./Dashboard.scss"



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
                navigate('/')
            } 
        }
        else{
          alert('N ai voie')
          navigate('/')
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
    return <div >
      <div className="button-container">
        <button className="select-button-details" onClick={()=>setData(trucksBorders)}>Trucks</button>
        <button className="select-button-details" onClick={()=>setData(carsBorders)}> Cars </button>
        </div>
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
        <div className="map-details"><GoogleMap 
        zoom={7} 
        center={center} 
        mapContainerStyle={{width: "100%" , height: "85vh",borderRadius: "10px"}}>
        
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
          <div >
          <InfoWindowF
            
            position={{lat:selectedElement.latitude, lng:selectedElement.longitude}}
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div >
              <h1 className="info-window-container">{selectedElement.name}</h1>
                <div clasName="map-button-container">
                  <button className="map-button-details" onClick={()=>navigate(`/viewTruckControls/${selectedElement._id}`)}>View Truck Controls</button>
                  <button className="map-button-details" onClick={()=>navigate(`/viewControls/${selectedElement._id}`)}>View Car Controls</button>
                </div>
            </div>
          </InfoWindowF>
          </div>
        ) : null}      
        </GoogleMap></div>
    )
}

