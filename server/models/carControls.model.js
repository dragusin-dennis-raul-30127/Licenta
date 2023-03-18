const mongoose=require('mongoose')

const carControls = new mongoose.Schema(
    {
    name:{ type: String,required: true },
    licensePlate:{ type: String,required: true ,unique: true},
    vinNumber:{ type: String,required: true,unique: true},
    vehicleModel:{ type: String,required: true },
    vehicleYear:{ type: String,required: true },
    date:{type: Date,required: true},
    problems:{type: Boolean,required: true},
    problemDescription:{type: String,required: false},    
    },
    {collection: 'carControlsData' }      
)

const model = mongoose.model('carControlsData',carControls)

module.exports = model