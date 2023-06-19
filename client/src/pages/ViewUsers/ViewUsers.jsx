import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';

import { useNavigate } from 'react-router-dom'
import {useMemo} from 'react'
import {Table} from '../../components/Table/Table'
import "./ViewUsers.scss"

export default function Home(){
    const [data,setData]=useState([])
    const [viewUsers,setViewUsers]=useState([])

    
    const navigate = useNavigate()
    const fetchUsers=async()=>{
        try{
            const response = await axios().get("api/login")
            
            console.log(response.data.data)
            await setViewUsers(response.data.data)
        }
        catch(error){}
    }

   useEffect(()=>{
        fetchUsers()
   },[])

  
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('You must login first!')
            navigate('/')
        }
    })
    

    
    
    const columns=useMemo(()=> [
        {
            Header: "Name" , 
            accessor: "name"
        },
        {
            Header: "Email" , 
            accessor: "email"
        },
        {
            Header: "Badge Number" , 
            accessor: "badgeNumber"
        },
       
    ],[])
    
    return <div className="wrapper-view-users"><div className="user-details">Users</div>
    {
       viewUsers.length>0  &&  <div className="positioning-users">
        <Table data={viewUsers} columns={columns}/>
        </div>
    }
   
    </div> 
}