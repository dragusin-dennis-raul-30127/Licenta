const mongoose=require('mongoose')

const borders = new mongoose.Schema(
    {
    name:{ type: String,required: true },
    latitude:{ type:Number,required:true}, 
    longitude:{ type:Number,required:true}, 
    waitTime:{ type:Number,required:true},
    areCarsAllowed:{type:Boolean,required:true},
    areTrucksAllowed:{type:Boolean,required:true},
    },
    {collection: 'bordersData' }      
)

const model = mongoose.model('bordersData',borders)

module.exports = model