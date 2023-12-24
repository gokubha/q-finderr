const mongoose= require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryId: {type: Number,default:0},
    name: {type:String,default:''},
    description: {type:String,default:''},
    image: {type:String,default:''},
    createdat: {type:Date,default:Date.now},
    status: {type:Boolean,default:true},
})

module.exports= new mongoose.model('category',categorySchema)