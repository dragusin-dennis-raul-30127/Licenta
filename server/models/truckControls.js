const mongoose=require('mongoose')

const truckControls = new mongoose.Schema(
    {
    name:{ type: String,required: true },
    licensePlate:{ type: String,required: true ,unique: true},
    vinNumber:{ type: String,required: true,unique: true},
    vehicleModel:{ type: String,required: true },
    vehicleYear:{ type: Number,required: true },
    date:{type: Date,required: true},
    weight:{type: Number,required:true},
    height:{type: Number,required:true},
    width:{type: Number,required:true},
    length:{type: Number,required:true},
    problems:{type: Boolean,required: true},
    problemDescription:{type: String,required: false},    
    },
    {collection: 'truckControlsData' }      
)

const model = mongoose.model('truckControlsData',truckControls)

module.exports = model