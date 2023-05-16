import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';

import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {Table} from '../../components/Table/Table'
import "./ViewTruckControls.scss"

export default function Home(){
    const [data,setData]=useState([])
    const [truckControls,setTruckControls]=useState([])

    
    const navigate = useNavigate()
    const fetchTruckControls=async()=>{
        try{
            const response = await axios().get("api/truckControls")
            
            console.log(response.data.data)
            await setTruckControls(response.data.data)
        }
        catch(error){}
    }

   useEffect(()=>{
        fetchTruckControls()
   },[])

  
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('N ai voie')
            navigate('/')
        }
    })
    

    const truckControlsData=useMemo(()=> truckControls,[truckControls]);
    
    const columns=useMemo(()=> [
        {
            Header: "Border" , 
            accessor: "border"
        },
        {
            Header: "Name" , 
            accessor: "name"
        },
        {
            Header: "License Plate" , 
            accessor: "licensePlate"
        },
        {
            Header: "VIN Number" , 
            accessor: "vinNumber"
        },
        {
            Header: "Entering/Exiting" , 
            accessor: "isEntering"
        },
        {
            Header: "Vehicle Model" , 
            accessor: "vehicleModel"
        },
        {
            Header: "Vehicle Year" , 
            accessor: "vehicleYear"
        },
        {
            Header: "Date" , 
            accessor: "date"
        },
        {
            Header: "Weight (Tons)" , 
            accessor: "weight"
        },
        {
            Header: "Height (Meters)" , 
            accessor: "height"
        },
        {
            Header: "Width (Meters)" , 
            accessor: "width"
        },
        {
            Header: "Length (Meters)" , 
            accessor: "length"
        },

        {
            Header: "Problems" , 
            accessor: "problems"
        },
        {
            Header: "Problem Description" , 
            accessor: "problemDescription"
        },
    ],[])
    
    return <div className="wrapper-truck-control"><div className="title-details-view-truck">All Truck Controls</div>
    {
       truckControls.length>0  &&  <div className="positioning-truck">
        <Table data={truckControls} columns={columns}/>
        </div>
    }
   
    </div> 
}