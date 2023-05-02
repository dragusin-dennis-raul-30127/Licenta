import { useState } from "react"
import axios from '../../api/axios'
import { useNavigate } from "react-router-dom"

export default function DeleteUser (){
    const [data,setData]=useState([])
    const [error,setError]=useState("")

    const [badge,setBadge]=useState("")

    
    const navigate = useNavigate()

    const deleteUsers=async(number)=>{
        try{
             await axios().delete("api/deleteUser/"+`${badge}`)
            
        }
        catch(error){setError(error)}
    }

return(
    <div>
        <div>Delete Users</div>
        <label htmlFor="badge" >Select Number to delete</label>
        <input type="text" name="badge" value={badge} onChange={(e)=>setBadge(e.target.value)}/>

        <button disabled={badge===""} onClick={()=>{deleteUsers(badge);alert("User Deleted!");navigate("/dashboard")}}>Delete</button>
        {error&& <div>{error}</div>}
    </div>
   
)
}
