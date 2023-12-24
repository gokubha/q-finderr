const mongoose= require('mongoose')

const subCategorySchema = new mongoose.Schema({
    subCategoryId: {type:Number,default:0},
    categoryId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'category'},
    name: {type:String,default:''},
    description: {type:String,default:''},
    image: {type:String,default:''},
    createdat: {type:Date,default:Date.now},
    status: {type:Boolean,default:true},
})

module.exports= new mongoose.model('subCategory',subCategorySchema)