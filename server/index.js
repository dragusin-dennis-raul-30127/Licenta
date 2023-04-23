const express = require('express')
const app= express()
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./models/user.model')
const borders=require('./models/borders.model')
const carControls=require('./models/carControls.model')
const truckControls=require('./models/truckControls')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Licenta')

app.post('/api/register',async (req,res)=>{
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const user=await User.create({
            name: req.body.name,
            email: req.body.email,
            badgeNumber: req.body.badgeNumber,
            password: newPassword,
            isAdmin: req.body.isAdmin
        })
        res.json({status: 'ok'})
        
    } catch (err){
        console.log(err)
        res.json({status: 'error',error: 'Duplicate email'})
    }
    
})

app.post('/api/login',async (req,res)=>{
    
    
        const user=await User.findOne({
            email: req.body.email,
            
        })
        if(!user){
            return { status: 'error', error: 'Invalid User'}
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if(isPasswordValid){
            const token=jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    badgeNumber: user.badgeNumber,
                    isAdmin: user.isAdmin
                },
                'secret123'
            )
            res.json({status: 'ok', user: token})
        }
        else{
            res.json({status: 'error', user: false})
        } 
})
app.delete('/api/login',async(req,res)=>{
    try{
        const user=await User.deleteOne({email:req.body.email})
        return res.json({status: 'ok',message:'User deleted'})
    }catch (err){
        console.log(err)
        res.json({status: err.status,error: err.message})
    }
})    


app.post('/api/borders',async (req,res)=>{
    console.log(req.body)
    try{
        const border=await borders.create({
            name:req.body.name,
            latitude:req.body.latitude, 
            longitude:req.body.longitude, 
            waitTime:req.body.waitTime,
            areCarsAllowed:req.body.areCarsAllowed,
            areTrucksAllowed:req.body.areTrucksAllowed,
        })
        res.json({status: 'ok'})
        
    } catch (err){
        console.log(err)
        res.json({status: err.status,error: err.message})
    }
    
})

app.get('/api/borders',async(req,res)=>{
    try{
        const border = await borders.find()
        return res.json({status: 'ok',data: border})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.get('/api/borders/:id', async (req, res) => {
    try {
      const border = await borders.findOne({ _id: req.params.id });
      return res.json({ status: 'ok', data: border });
    } catch (err) {
      console.log(err);
      res.json({ status: err.status, error: err.message });
    }
  });

app.put('/api/borders',async(req,res)=>{
    try{
        const border = await borders.updateOne({_id:req.body._id},
            {   
                name:req.body.name,
                latitude:req.body.latitude, 
                longitude:req.body.longitude, 
                waitTime:req.body.waitTime,
                areCarsAllowed:req.body.areCarsAllowed,
                areTrucksAllowed:req.body.areTrucksAllowed,
            })
        return res.json({status:'ok',data: border})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})
app.delete('/api/borders',async(req,res)=>{
    try{
        const border = await borders.deleteOne({name:req.body.name})
        return res.json({status:'ok',message:'Border deleted'})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.post('/api/carControls',async (req,res)=>{
    console.log(req.body)
    const authHeader = req.headers.authorization
    if(!authHeader){
        res.send(401,'Unauthorized request')
    }
    const token=authHeader.split(' ')[1] 
    const decoded=jwt.verify(token,'secret123')
    try{
        
        
        const carControl=await carControls.create({
            border:req.body.border,
            name:req.body.name,
            licensePlate:req.body.licensePlate,
            vinNumber:req.body.vinNumber,
            vehicleModel:req.body.vehicleModel,
            vehicleYear:req.body.vehicleYear,
            problems:req.body.problems,
            problemDescription:req.body.problemDescription
        })
        res.json({status: 'ok'})
        
    } catch (err){
        console.log(err)
        res.json({status: err.status,error: err.message})
    }
    
})

app.get('/api/carControls',async(req,res)=>{
    try{
        const carControl = await carControls.find()
        console.log("mere")
        return res.json({status: 'ok',data: carControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.get('/api/carControls/:border', async (req, res) => {
    try {
      const carControl = await carControls.find({ border: req.params.border });
      return res.json({ status: 'ok', data: carControl });
    } catch (err) {
      console.log(err);
      res.json({ status: err.status, error: err.message });
    }
  });

app.get('/api/carControlsByLicensePlate',async(req,res)=>{
    try{
        const carControl = await carControls.findOne({licensePlate:req.body.licensePlate})
        return res.json({status: 'ok',data: carControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})
app.put('/api/carControls',async(req,res)=>{
    try{
        const carControl = await carControls.updateOne({_id:req.body._id},
            {   
                border: req.body.border,
                name:req.body.name,
                licensePlate:req.body.licensePlate,
                vinNumber:req.body.vinNumber,
                vehicleModel:req.body.vehicleModel,
                vehicleYear:req.body.vehicleYear,
                date:req.body.date,
                problems:req.body.problems,
                problemDescription:req.body.problemDescription
            })
        return res.json({status:'ok',data: carControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.delete('/api/carControls',async(req,res)=>{
    try{
        const carControl = await carControls.deleteOne({licensePlate:req.body.licensePlate})
        return res.json({status:'ok',message:'Control deleted'})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})





app.post('/api/truckControls',async (req,res)=>{
    console.log(req.body)
    try{
        const truckControl=await truckControls.create({
                border:req.body.border,
                name:req.body.name,
                licensePlate:req.body.licensePlate,
                vinNumber:req.body.vinNumber,
                vehicleModel:req.body.vehicleModel,
                vehicleYear:req.body.vehicleYear,
                weight:req.body.weight,
                height:req.body.height,
                width:req.body.width,
                length:req.body.length,
                problems:req.body.problems,
                problemDescription:req.body.problemDescription
        })
        res.json({status: 'ok'})
        
    } catch (err){
        console.log(err)
        res.json({status: err.status,error: err.message})
    }
    
})

app.get('/api/truckControls',async(req,res)=>{
    try{
        const truckControl = await truckControls.find()
        return res.json({status: 'ok',data: truckControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.get('/api/truckControlsByLicensePlate',async(req,res)=>{
    try{
        const truckControl = await truckControls.findOne({licensePlate:req.body.licensePlate})
        return res.json({status: 'ok',data: truckControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})
app.put('/api/truckControls',async(req,res)=>{
    try{
        const truckControl = await truckControls.updateOne({_id:req.body._id},
            {   
                border: req.body.border,
                name:req.body.name,
                licensePlate:req.body.licensePlate,
                vinNumber:req.body.vinNumber,
                vehicleModel:req.body.vehicleModel,
                vehicleYear:req.body.vehicleYear,
                date:req.body.date,
                weight:req.body.weight,
                height:req.body.height,
                width:req.body.width,
                length:req.body.length,
                problems:req.body.problems,
                problemDescription:req.body.problemDescription
            })
        return res.json({status:'ok',data: truckControl})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})

app.delete('/api/truckControls',async(req,res)=>{
    try{
        const truckControl = await truckControls.deleteOne({licensePlate:req.body.licensePlate})
        return res.json({status:'ok',message:'Control deleted'})
    }catch (err){
        console.log(err)
        res.json({status:err.status,error: err.message})
    }
})
app.listen(1337,()=>{
    console.log('Server started on 1337')
})