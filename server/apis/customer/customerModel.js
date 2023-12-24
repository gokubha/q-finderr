const mongoose= require('mongoose')

const customerSchema = new mongoose.Schema({
    customerId: {type: Number,default:0},
    name: {type:String,default:''},
    email: {type:String,default:''},
    password: {type:String,default:''},
    gender: {type:String,default:''},
    contact: {type:String,default:''},
    address: {type:String,default:''},
    userId: {type:mongoose.Schema.Types.ObjectId, default:null, ref:'user'}
})

module.exports= new mongoose.model('customer',customerSchema)