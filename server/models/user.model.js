const mongoose=require('mongoose')

const User = new mongoose.Schema(
    {
    name:{ type: String,required: true },
    email:{ type: String,required: true ,unique: true},
    badgeNumber:{ type: String,required: true ,unique: true},
    password:{ type: String,required: true },
    isAdmin:{type: Boolean,required: true},
    },
    {collection: 'userData' }      
)

const model = mongoose.model('UserData',User)

module.exports = model