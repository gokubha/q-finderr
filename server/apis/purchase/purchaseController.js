const purchase = require('./purchaseModel')

const addPurchase = async(req,res)=>{
    let validation =''
    if(!req.body.userId)
        validation += 'userId is required, '
    if(!req.body.postId)
        validation += 'postId is required, '
    if(!req.body.price)
        validation += 'price is required,' 
    if(!req.body.contact)
        validation += 'contact is required, '
    if(!req.body.address)
        validation += 'address is required, '
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total=await purchase.countDocuments()
    let addPurchase= new purchase({
        purchaseId: total+1,
        userId: req.body.userId,
        postId: req.body.postId,
        price: req.body.price,
        contact: req.body.contact,
        address: req.body.address,
    })
    addPurchase.save()
.then((result)=>{
    res.json({
        success: true,
        status: 200,
        message: "New Purchase Added Successfully",
        data: result
    })
})
.catch((err)=>{
    res.json({
        success: false,
        status: 500,
        message: err.message
    })
})
}}


const getPurchase = async(req,res)=>{
    let total=await purchase.countDocuments()
    purchase.find(req.body).populate('userId').populate('postId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"Purchases Loaded Successfully",
            data:result
        })
    })
    .catch(error=>{
        res.json({
            success:false,
            status:500,
            message:error.message
        })
    })
}


const getSinglePurchase = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    purchase.findOne({_id:req.body._id}).populate('userId').populate('postId')
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:"No Purchase Found",   
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single Purchase Loaded",
            data:result,
        })
    })
    .catch(error=>{
        res.json({
            success:false,
            status:500,
            message:error.message
        })
    })
    }}

module.exports={addPurchase, getPurchase, getSinglePurchase}