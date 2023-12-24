const category= require('./categoryModel')
const fs = require('fs')

const addCategory = async(req,res)=>{
    let validation =''
    if(!req.body.name)
        validation += 'name is required, '
    if(!req.body.image)
        validation += 'image is required'
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total=await category.countDocuments()
    let addCategory= new category({
        categoryId: total+1,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    })
    let prevCategory = await category.findOne({
        name:req.body.name
    })
    if(!!prevCategory)
    res.send({
        success: false,
        status:500,
        message:'Category Already Exists with Same Name'
    })
    else
    addCategory.save()
.then((result)=>{
    res.json({
        success: true,
        status: 200,
        message: "New Category Added Successfully",
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


const getCategory = async(req,res)=>{
    let total=await category.countDocuments()
    category.find(req.body)
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"Categories Loaded Successfully",
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


const getSingleCategory = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    category.findOne({_id:req.body._id})
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:'No Category Found'
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single Category Loaded",
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


    const updateCategory=(req,res)=>{
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
            category.findOne({_id: req.body._id})
            .then(async result=>{
                if(result==null)
                res.send({
                    success:false,
                    status:500,
                    message:'No Category Found'
                })
                else{
                    if(!!req.body.name)
                    result.name= req.body.name
                    if(!!req.body.image){
                        fs.unlinkSync('server/public/'+result.image)
                        result.image= req.body.image
                    }
                    let prevCategory = await category.findOne({
                    $and:[{name: req.body.name}, {_id:
                    {$ne:result._id}}]
                     })
                     if(!!prevCategory)
                        res.send({
                        success: false,
                        status:500,
                        message:'Category Alrezady Exists with Same Name'
                    })
                    else{
                    result.save()
                    .then(updatedRes=>{
                        res.send({
                            success:true,
                            status:200,
                            message:'Category Updated Successfully',
                            data: updatedRes,
                        })
                    })
                    .catch(error=>{
                        res.send({
                            success: false,
                            status: 500,
                            message: error.message
                        })
                    })
                
                .catch(error=>{
                    res.send({
                        success: false,
                        status: 500,
                        message: error.message
                    })
                })
                    }}
            }
        
        )}
    }


    const deleteCategory = (req,res)=>{
        let validation=''
        if(!req.query._id)
        validation += '_id is required '
        if(!!validation)
        res.send({
            success:false,
            status: 500,
            message: validation
        })
        else{
        category.findOne({_id:req.query._id})
        .then(result=>{
            if(result==null)
                res.send({
                    status:false,
                    status:500,
                    message:'No Category Found',
                })
                else{
        category.deleteOne()
            .then(result=>{
            res.json({
                success:true,
                status:200,
                message:"Category Deleted",
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
        }
    })
        .catch(error=>{
            res.json({
                success:false,
                status:500,
                message:error.message
            })
        })
    }}



    const changeStatus = (req,res)=>{
        let validation = ''
        if(!req.body._id)
            validation+= '_id is required, '
        if(!req.body.status)
            validation += 'status is required'
        if(!!validation)
            res.send({success:false, status:500, message:validation})
        else{
            category.findOne({_id:req.body._id})
            .then(result=>{
                if(result == null)
                    res.send({success:false, status:500, message:"No Category Found"})
                else{
                    if(!!req.body.status)
                        result.status = req.body.status
                    result.save()
                    .then(updatedResult =>{
                        res.send({success:true, status:200, message:"Category Status Updated", data:updatedResult})
                    })
                    .catch(error=>{
                        res.send({success:false, status:500, message:error.message})
                    })
                }
            })
            .catch(error=>{
                res.send({success:false, status:500, message:error.message})
            })
        }
    }

module.exports={addCategory, getCategory, getSingleCategory, updateCategory, deleteCategory, changeStatus}