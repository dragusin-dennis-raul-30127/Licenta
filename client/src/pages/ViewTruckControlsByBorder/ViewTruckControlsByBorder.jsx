
import { useParams } from "react-router-dom"
import React, { useEffect , useState} from 'react'
import axios from '../../api/axios';
import {Table} from '../../components/Table/Table'
import {useMemo} from 'react'

import "./ViewTruckControlsByBorder.scss"


export const ViewTruckControlByBorder=()=>{
    const {id}=useParams()

    
    const [border,setBorder]=useState({})
    const [truckControl,setTruckControl]=useState([])
    console.log(border)
    const fetchBorder=async()=>{
        try{
            const response = id && await axios().get("api/borders/"+`${id}`)
            setBorder(response.data.data)
        }
        catch(error){}
    }


    const fetchTruckControl=async()=>{
        try{
            const response = border && await axios().get("api/truckControls/"+`${border.name}`)
            setTruckControl(response.data.data)
        }
        catch(error){}
    }

    useEffect(()=>{
        console.log("aaaa",truckControl)

    },[truckControl])

   useEffect(()=>{
        fetchBorder()
   },[id])

   useEffect(()=>{
    fetchTruckControl()
   },[border])

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
        Header: "Problems" , 
        accessor: "problems"
    },
    {
        Header: "Problem Description" , 
        accessor: "problemDescription"
    },
],[])

    return <div className="wrapper-truck-control"><div>{border && border.name}</div>
    {
       truckControl.length>0  &&  <div className="positioning-truck">
        <Table data={truckControl} columns={columns}/>
        </div>
    }
   
    </div> 
}