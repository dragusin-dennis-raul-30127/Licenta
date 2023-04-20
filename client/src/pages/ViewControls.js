import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from '../api/axios';

import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {Table} from '../components/Table'
import { useTable } from 'react-table';
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
    console.log(carControls)
    

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
    
    return(
        <div>
            {carControls.length > 0 &&(
                <Table data ={carControls} columns ={columns} />
            )}

        </div>
    );
}