const mongoose= require('mongoose')

const contactSchema = new mongoose.Schema({
    contactId: {type: Number,default:0},
    name: {type:String,default:''},
    email: {type:String,default:''},
    subject: {type:String,default:''},
    message: {type:String,default:''},
    createdat: {type:Date,default:Date.now},
})

module.exports= new mongoose.model('contact',contactSchema)