const mongoose= require('mongoose')

const userInfoSchema = new mongoose.Schema({
    userInfoId: {type: Number,default:0},
    name: {type:String,default:''},
    email: {type:String,default:''},
    password: {type:String,default:''},
    gender: {type:String,default:''},
    city: {type:String,default:''},
    state: {type:String,default:''},
    createdat: {type:Date,default:Date.now},
    status: {type:Boolean,default:true},
})

module.exports= new mongoose.model('userInfo',userInfoSchema)