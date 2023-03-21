const mongoose=require('mongoose')

const truckControls = new mongoose.Schema(
    {
    name:{ type: String,required: true },
    licensePlate:{ type: String,required: true ,unique: true},
    vinNumber:{ type: String,required: true,unique: true},
    vehicleModel:{ type: String,required: true },
    vehicleYear:{ type: Number,required: true },
    date:{type: Date,required: true,default: Date.now()},
    weight:{type: String,required:true},
    height:{type: String,required:true},
    width:{type: String,required:true},
    length:{type: String,required:true},
    problems:{type: Boolean,required: true},
    problemDescription:{type: String,required: false},    
    },
    {collection: 'truckControlsData' }      
)

const model = mongoose.model('truckControlsData',truckControls)

module.exports = model