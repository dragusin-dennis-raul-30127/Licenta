import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';

import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {Table} from '../../components/Table/Table'
import './ViewControls.scss'

export default function Home(){
    const [data,setData]=useState([])
    const [carControls,setCarControls]=useState([])

    
    const navigate = useNavigate()
    const fetchCarControls=async()=>{
        try{
            const response = await axios().get("api/carControls")
            
            console.log(response.data.data)
            await setCarControls(response.data.data)
        }
        catch(error){}
    }

   useEffect(()=>{
        fetchCarControls()
   },[])

  
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('N ai voie')
            navigate('/')
        }
    })
    

    const carControlsData=useMemo(()=> carControls,[carControls]);
    
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
            Header: "Problems" , 
            accessor: "problems"
        },
        {
            Header: "Problem Description" , 
            accessor: "problemDescription"
        },
    ],[])
    
    return <div className="wrapper-car-control"><div className="title-details-view-car">All Car Controls</div>
    {
       carControls.length>0  &&  <div className="positioning">
        <Table data={carControls} columns={columns}/>
        </div>
    }
   
    </div> 
}