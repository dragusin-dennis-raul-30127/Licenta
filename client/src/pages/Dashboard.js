import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'


export default function Home(){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey: "AIzaSyBFodgAyXyjij2e-8p9qsSoHn8m9mnzp5Q",
    })

    if(!isLoaded) {
        return <div>Loading...</div>
    }
    return <Map />
}
function Map(){
    const center = useMemo(() => ({ lat: 46.771210,lng: 23.623635}),[])
    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerStyle={{width: "100%" , height: "100vh"}}>
                <Marker position={center} />
        </GoogleMap>
    )
}

/*const Dashboard = () =>{
    const history = useNavigate()
    const [quote, setQuote]=useState('')
    const [tempQuote, setTempQuote]=useState('')

    
    async function populateQuote(){
        const req = await fetch('http://localhost:1337/api/quote',{
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(data.quote)
        }else{
            alert(data.error)
        }
    }
    useEffect(() => {
        const token=localStorage.getItem('token')
        if (token) {
            const user =jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            } else{
                populateQuote()
            }
        }
    },[])

    async function updateQuote() {
        
        const req = await fetch('http://localhost:1337/api/quote',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(tempQuote)
            setTempQuote('')
            
        }else{
            alert(data.error)
        }
    }
    return(
    <div>
        <h1>Your Quote: {quote || 'No quote found'}</h1>
        <form onSubmit={updateQuote}>
            <input 
            type="text"
            placeholder="Quote"
            value={tempQuote}
            onChange={(e) => setTempQuote(e.target.value)}
            />
            <input type="submit" value="Update quote" />
        </form>
    </div>

    )
}

export default Dashboard*/