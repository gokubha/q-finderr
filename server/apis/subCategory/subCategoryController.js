const subCategory= require('./subCategoryModel')
const fs = require('fs')

const addSubCategory = async(req,res)=>{
    let validation =''
    if(!req.body.categoryId)
        validation += 'categoryId is required, '
    if(!req.body.name)
        validation += 'name is required, '
    if(!req.body.image)
        validation += 'image is required'
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total=await subCategory.countDocuments()
    let addSubCategory= new subCategory({
        subCategoryId: total+1,
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    })
    let prevSubCategory = await subCategory.findOne({
        name: req.body.name
    })
    if(!!prevSubCategory)
    res.send({
        success: false,
        status:500,
        message:'SubCategory Already Exists with Same Name'
    })
    else
    addSubCategory.save()
.then((result)=>{
    res.json({
        success: true,
        status: 200,
        message: "New subCategory Added Successfully",
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


const getSubCategory = async(req,res)=>{
    let total=await subCategory.countDocuments()
    subCategory.find(req.body).populate('categoryId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"SubCategories Loaded Successfully",
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


const getSingleSubCategory = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    subCategory.findOne({_id:req.body._id}).populate('categoryId')
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:'No Sub-Category Found'
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single subCategory Loaded",
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

    const updateSubCategory=(req,res)=>{
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
            subCategory.findOne({_id: req.body._id})
            .then(async result=>{
                if(result==null)
                res.send({
                    success:false,
                    status:500,
                    message:'No SubCategory Found'
                })
                else{
                    if(!!req.body.name)
                    result.name= req.body.name
                    if(!!req.body.image){
                        fs.unlinkSync('server/public/'+result.image)
                        result.image= req.body.image
                    }                    
                    let prevSubCategory = await subCategory.findOne({
                    $and:[{name: req.body.name}, {_id:
                    {$ne:result._id}}]
                     })
                     if(!!prevSubCategory)
                        res.send({
                        success: false,
                        status:500,
                        message:'SubCategory Already Exists with Same Name'
                    })
                    else{
                    result.save()
                    .then(updatedRes=>{
                        res.send({
                            success:true,
                            status:200,
                            message:'SubCategory Updated Successfully',
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
                }   
                }
            }
        
        )}
    }


    const deleteSubCategory = (req,res)=>{
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
        subCategory.findOne({_id:req.query._id})
        .then(result=>{
            if(result==null)
                res.send({
                    status:false,
                    status:500,
                    message:'No SubCategory Found',
                })
                else{
        subCategory.deleteOne()
            .then(result=>{
            res.json({
                success:true,
                status:200,
                message:"SubCategory Deleted",
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

module.exports={addSubCategory, getSubCategory, getSingleSubCategory, updateSubCategory, deleteSubCategory, }