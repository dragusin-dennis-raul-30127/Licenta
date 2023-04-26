import './Navbar.scss'
import {useNavigate} from 'react-router-dom'




export const Navbar = ()=>{
    const navigate = useNavigate()
    return(
        <div className="wrapper">
            <div className="left-side">
                <div onClick={()=>navigate('/dashboard')} className="logo-details">
                    Logo
                </div>
                <div onClick={()=>navigate('/dashboard')} className="title-details">
                    Border Control
                </div>
            </div>
            <div className="right-side">
                <button onClick={()=>navigate('/viewControls')} className="button-details">
                    View All Car Controls
                </button>
                <button onClick={()=>navigate('/viewTruckControls')}className="button-details">
                    View All Truck Controls
                </button>
                <button onClick={()=>navigate('/carControls')}className="button-details">
                    Enter Car Control
                </button>
                <button onClick={()=>navigate('/truckControls')}className="button-details">
                    Enter Truck Control
                </button>
                <div className="user-details">
                     User

                </div>
            </div>
        </div>
    )
}