const mongoose= require('mongoose')

const purchaseSchema = new mongoose.Schema({
    purchaseId: {type: Number,default:0},
    userId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    postId: {type:mongoose.Schema.Types.ObjectId,default:null,ref:'post'},
    price: {type:Number,default:0},
    contact: {type:Number,default:0},
    address: {type:String,default:''},
})

module.exports= new mongoose.model('purchase',purchaseSchema)