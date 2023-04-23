
import { useParams } from "react-router-dom"
import React, { useEffect , useState} from 'react'
import axios from '../../api/axios';
import {Table} from '../../components/Table/Table'
import {useMemo} from 'react'

import "./ViewControlsByBorder.scss"


export const ViewCarControlByBorder=()=>{
    const {id}=useParams()

    
    const [border,setBorder]=useState({})
    const [carControl,setCarControl]=useState([])
    console.log(border)
    const fetchBorder=async()=>{
        try{
            const response = id && await axios().get("api/borders/"+`${id}`)
            setBorder(response.data.data)
        }
        catch(error){}
    }


    const fetchCarControl=async()=>{
        try{
            const response = border && await axios().get("api/carControls/"+`${border.name}`)
            setCarControl(response.data.data)
        }
        catch(error){}
    }

    useEffect(()=>{
        console.log("aaaa",carControl)

    },[carControl])

   useEffect(()=>{
        fetchBorder()
   },[id])

   useEffect(()=>{
    fetchCarControl()
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
        Header: "Problems" , 
        accessor: "problems"
    },
    {
        Header: "Problem Description" , 
        accessor: "problemDescription"
    },
],[])

    return <div className="wrapper-car-control"><div>{border && border.name}</div>
    {
       carControl.length>0  &&  <div className="positioning">
        <Table data={carControl} columns={columns}/>
        </div>
    }
   
    </div> 
}