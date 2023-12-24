const mongoose= require('mongoose')

const postSchema = new mongoose.Schema({
    postId: {type: Number,default:0},
    userId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    categoryId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'category'},
    subCategoryId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'subCategory'},
    title: {type:String,default:''},
    description: {type:String,default:''},
    price: {type:Number,default:0},
    negotiable: {type:Boolean, default:true},
    featured: {type:String, default:''},
    image: {type:String,default:''},
    latitude: {type:String,default:''},
    longitude: {type:String,default:''},
    city: {type:String,default:''},
    state: {type:String,default:''},    
    createdat: {type:Date,default:Date.now},
})

module.exports= new mongoose.model('post',postSchema)