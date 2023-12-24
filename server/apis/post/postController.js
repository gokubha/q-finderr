const post= require('./postModel')
const fs = require('fs')

const addPost = async(req,res)=>{
    let validation =''
    if(!req.body.userId)
        validation += 'userId is required, '
    if(!req.body.categoryId)
        validation += 'categoryId is required, '
    if(!req.body.subCategoryId)
        validation += 'subCategoryId is required, '
    if(!req.body.title)
        validation += 'title is required, '
    if(!req.body.price)
        validation += 'price is required, '    
    if(!req.body.image)
        validation += 'image is required, '
    if(!req.body.city)
        validation += 'city is required, '
    if(!req.body.state)
        validation += 'state is required,'
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total=await post.countDocuments()
    let addPost= new post({
        postId: total+1,
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        negotiable: req.body.negotiable,
        featured: req.body.featured,
        image: req.body.image,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        state: req.body.state,
    })
    addPost.save()
.then((result)=>{
    if(result==null)
    res.send({
        success:false,
        status:500,
        message:'No Post Found'
    })    
    else{
    res.json({
        success: true,
        status: 200,
        message: "New Post Added Successfully",
        data: result
    })
    }
})

.catch((err)=>{
    res.json({
        success: false,
        status: 500,
        message: err.message
    })
})
}}
    



const getPost = async(req,res)=>{
    let total=await post.countDocuments()
    post.find(req.body).populate('userId').populate('categoryId').populate('subCategoryId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"Posts Loaded Successfully",
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


const getSinglePost = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    post.findOne({_id:req.body._id}).populate('userId').populate('categoryId').populate('subCategoryId')
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:"Post Not Found",
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single Post Loaded",
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

const updatePost=(req,res)=>{
        let validation=''
        if(!req.body._id)
        validation += '_id is required '
        if(!!validation)
        res.send({
            success:false,
            status: 500,
            message: validation
        })
        else{
            post.findOne({_id: req.body._id})
            .then(async result=>{
                if(result==null)
                res.send({
                    success:false,
                    status:500,
                    message:'No Post Found'
                })
                else{
                    if(!!req.body.userId)
                    result.userId= req.body.userId
                    if(!!req.body.categoryId)
                    result.categoryId= req.body.categoryId
                    if(!!req.body.subCategoryId)
                    result.subCategoryId= req.body.subCategoryId
                    if(!!req.body.title)
                    result.title= req.body.title
                    if(!!req.body.description)
                    result.description= req.body.description
                    if(!!req.body.price)
                    result.price= req.body.price
                    if(!!req.body.negotiable)
                    result.negotiable= req.body.negotiable
                    if(!!req.body.featured)
                    result.featured= req.body.featured
                    if(!!req.body.image){
                        fs.unlinkSync('server/public/'+result.image)
                        result.image= req.body.image
                    }
                    if(!!req.body.latitude)
                    result.latitude= req.body.latitude
                    if(!!req.body.longitude)
                    result.longitude= req.body.longitude
                    if(!!req.body.city)
                    result.city= req.body.city
                    if(!!req.body.state)
                    result.state= req.body.state
                    
                    // let prevPost = await post.findOne({
                    // $and:[{title: req.body.title}, {_id:
                    // {$ne:result._id}}]
                    //  })
                    //  if(!!prevPost)
                    //     res.send({
                    //     success: false,
                    //     status:500,
                    //     message:'Post Already Exists with Same Title'
                    // })
                    else{
                    result.save()
                    .then(updatedRes=>{
                        res.send({
                            success:true,
                            status:200,
                            message:'Post Updated Successfully',
                            data: updatedRes,
                        })
                    })
                    .catch(error=>{
                        res.send({
                            success: false,
                            status: 500,
                            message: error.message
                        })
                    })}
                }})   
                
            
            .catch(error=>{
                res.send({
                    success: false,
                    status: 500,
                    message: error.message
                })
            })
            
         } }



module.exports={addPost, getPost, getSinglePost, updatePost,}