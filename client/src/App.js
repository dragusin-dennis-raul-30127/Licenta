import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import CarControl from './pages/CarControl/CarControl'
import TruckControl from './pages/TruckControl/TruckControl'
import ViewControls from './pages/ViewAllCarControls/ViewControls'
import ViewTruckControls from './pages/ViewAllTruckControls/ViewTruckControls'
import {Navbar} from './components/Navbar/Navbar'
import { ViewCarControlByBorder } from './pages/ViewControlsByBorder/ViewControlsByBorder'
import { ViewTruckControlByBorder } from './pages/ViewTruckControlsByBorder/ViewTruckControlsByBorder'
import ViewUsers from './pages/ViewUsers/ViewUsers'
import DeleteUser from './pages/DeleteUser/DeleteUser'

const App = () =>{
    return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/dashboard" exact element={<Dashboard/>}/>
            <Route path="/viewUsers" exact element={<ViewUsers/>}/>
            <Route path="/carControls" exact element={<CarControl/>}/>
            <Route path="/truckControls" exact element={<TruckControl/>}/>
            <Route path="/viewControls" exact element={<ViewControls/>}/>
            <Route path="/viewControls/:id" exact element={<ViewCarControlByBorder/>}/>
            <Route path="/viewTruckControls" exact element={<ViewTruckControls/>}/>
            <Route path="/viewTruckControls/:id" exact element={<ViewTruckControlByBorder/>}/>
            <Route path='/deleteUsers' exact element= {<DeleteUser/>}/>
        </Routes>
        </BrowserRouter>
        

    </div>
    )
}

export default App