const mongoose=require('mongoose')

const carControls = new mongoose.Schema(
    {
    border:{type:String,required:true},
    name:{ type: String,required: true },
    licensePlate:{ type: String,required: true ,unique: true},
    vinNumber:{ type: String,required: true,unique: true},
    isEntering:{ type: Boolean,required: true},
    vehicleModel:{ type: String,required: true },
    vehicleYear:{ type: String,required: true },
    date:{type: Date,required: true,default: Date.now()},
    problems:{type: Boolean,required: true},
    problemDescription:{type: String,required: false},    
    },
    {collection: 'carControlsData' }      
)

const model = mongoose.model('carControlsData',carControls)

module.exports = model