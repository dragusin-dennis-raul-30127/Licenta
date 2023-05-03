import { useState } from "react"
import axios from '../../api/axios'
import { useNavigate } from "react-router-dom"
import "./DeleteUser.scss"

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
    <div className="delete-wrapper">
        <div className="delete-title">Delete Users</div>
        <div className="form-positioning">
            <div className="form-details">
                <label htmlFor="badge" >Enter Badge Number</label>
            </div> 
                <div className="input-position"> 
                    <input className="input-details" type="text" name="badge" value={badge} onChange={(e)=>setBadge(e.target.value)}/>
                </div>
                    <div className="button-position">
                        <button  className="button-details" /*disabled={badge===""}*/ onClick={()=>{deleteUsers(badge);alert("User Deleted!");navigate("/dashboard")}}>Delete</button>
                    </div>

            
            
        </div>
    </div>
   
)
}
