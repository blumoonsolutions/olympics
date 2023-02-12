const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type:String, unique:true, required:true },
    password: { type:String, required:true },
    role: { type:String, default:'user' }
},{
    timestamps:true
})

module.exports = User = mongoose.model('user', userSchema)