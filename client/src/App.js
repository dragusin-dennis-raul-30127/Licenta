import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CarControl from './pages/CarControl'
import TruckControl from './pages/TruckControl'

const App = () =>{
    return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/dashboard" exact element={<Dashboard/>}/>
            <Route path="/carControls" exact element={<CarControl/>}/>
            <Route path="/truckControls" exact element={<TruckControl/>}/>
        </Routes>
        </BrowserRouter>


    </div>
    )
}

export default App