import './Navbar.scss'
import {useNavigate} from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { ICONS, Icon } from '../Icon/Icon'
import jwt_decode from 'jwt-decode';


export const Navbar = ()=>{
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.clear()
        navigate("/")
    }
    const viewUsers =()=>{
        navigate("/viewUsers")
    } 
    const registerUsers=()=>{
        navigate("/register")
    }   

function decodeJwtToken(token) {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    console.log('Error decoding JWT token:', error);
    return null;
  }
}
const user=decodeJwtToken(localStorage.getItem("token"))
console.log(user)

    return(
        <div className="wrapper">
            <div className="left-side">
                <div onClick={()=>navigate('/dashboard')} className="logo-details">
                    <img src="border-control.svg" />
                </div>
                <div onClick={()=>navigate('/dashboard')} className="title-details">
                    Border Control
                </div>
            </div>
            <div className="right-side">
                {
                    localStorage.getItem("token") && 
                <button onClick={()=>navigate('/viewControls')} className="button-details">
                    View All Car Controls
                </button>
                }
                {
                    localStorage.getItem("token") && 
                <button onClick={()=>navigate('/viewTruckControls')}className="button-details">
                    View All Truck Controls
                </button>
                }  
                {
                    localStorage.getItem("token") &&      
                <button onClick={()=>navigate('/carControls')}className="button-details">
                    Enter Car Control
                </button>
                }
                {
                    localStorage.getItem("token") && 
                <button onClick={()=>navigate('/truckControls')}className="button-details">
                    Enter Truck Control
                </button>
                }
                {
                    localStorage.getItem("token") && 
                <div className="fixed top-16 w-56 text-right">
      <Menu as="div" className="dropdown">
        <div>
          <Menu.Button className="dropdown-button">
            <Icon icon ={ICONS.USER_ICON}></Icon>
          </Menu.Button>
        </div>
          <Menu.Items className="dropdown-items">
            <div className="dropdown-items-wrapper ">
              <div className="dropdown-user-name">
                {user.name}
              </div>
              {(user.isAdmin) && 
              <div>
                <button className="dropdown-items-details" onClick={()=>viewUsers()}>
                    View Users
                </button>
              </div>}
              {(user.isAdmin) && 
                <div>
                    <button className="dropdown-items-details" onClick={()=>registerUsers()}>
                        Register User
                    </button>
                </div>}
                {(user.isAdmin) && 
                    <div>
                        <button className="dropdown-items-details" onClick={()=>navigate("/deleteUsers")}>
                            Delete User
                        </button>
                    </div>}
                        <div>
                            <button className="dropdown-items-details" onClick={()=>logout()}>
                                Logout
                            </button>
                        </div>
                        
              
            </div>
          </Menu.Items>
      </Menu>
    </div>}
              </div>
              
        </div>
    )
}