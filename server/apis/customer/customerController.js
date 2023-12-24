const customer = require('./customerModel')
const user = require('../user/userModel')
const bcrypt= require('bcrypt')
const addCustomer = async (req, res)=>{
    let validation = ''
    if(!req.body.name)
        validation += 'name is required'
    if(!req.body.email)
        validation += 'email is required'
    if(!req.body.password)
        validation += 'password is required'
    if(!req.body.contact)
        validation += 'contact is required'
    if(!req.body.address)
        validation += 'address is required'
    if(!req.body.gender)
        validation += 'gender is required'
    if(!!validation)
        res.send({success:false, status:500, message:validation})
    else{
        let total = await user.countDocuments()
        let newUser = new user({
            userId:total+1,
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 10),
            userType:2,
        })
        let prevUser = await user.findOne({email:req.body.email})
        if(!!prevUser)
            res.send({success:false, status:500, message:'User Exists with Same Email'})
        else
            newUser.save()
            .then(async savedUser=>{
                let totalCustomers = await customer.countDocuments()
                let newCustomer = new customer({
                    customerId:totalCustomers+1,
                    name:req.body.name,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.password, 10),
                    contact:req.body.contact,
                    address:req.body.address,
                    gender:req.body.gender,
                    userId:savedUser._id
                })
                newCustomer.save()
                .then(savedCustomer =>{
                    res.send({success:true, status:200, message:"Customer Added", data:savedCustomer})
                })
                .catch(err=>{
                    res.send({success:false, status:500, message:err.message})
                })
            })
        .catch(err=>{
            res.send({success:false, status:500, message:err.message})
        })
}}


const getCustomer = async(req,res)=>{
    let total=await customer.countDocuments()
    customer.find(req.body).populate('userId')
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"Customers Loaded Successfully",
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

const getSingleCustomer = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
        customer.findOne({_id:req.body._id}).populate('userId')
        .then(result=>{
            if(result == null)
                res.json({success:false, status:500, message:'No Customer Found'})
            else
        res.json({
            success:true,
            status:200,
            message:"Single Customer Loaded",
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
}


const updateCustomer=(req,res)=>{
    let validation=''
    if(!req.body.userId)
    validation += 'userId is required '
    if(!!validation)
    res.send({
        success:false,
        status: 500,
        message: validation
    })
    else{
        customer.findOne({userId: req.body.userId})
        .then(async result=>{
            if(result==null)
            res.send({
                status:false,
                status:500,
                message:'No Customer Found'
            })
            else{
                if(!!req.body.name)
                result.name= req.body.name
                if(!!req.body.email)
                result.email= req.body.email
                if(!!req.body.password)
                result.password= bcrypt.hashSync(req.body.password,10)
                if(!!req.body.gender)
                result.gender= req.body.gender
                if(!!req.body.contact)
                result.contact= req.body.contact
                if(!!req.body.address)
                result.address= req.body.address
                let prevCustomer = await customer.findOne({
                $and:[{email: req.body.email}, {_id:
                {$ne:result._id}}]
                 })
                 if(!!prevCustomer)
                    res.send({
                    success: false,
                    status:500,
                    message:'Customer Already Exists with Same Email'
                })
                else{
                result.save()
                .then(updatedRes=>{
                    user.findOne({ _id: req.body.userId })
                    .then(async userData => {
                        if (userData == null)
                            res.send({
                                success: false,
                                status: 500,
                                message: 'No User Found'
                            })
                        else {
                            if (!!req.body.name)
                                userData.name = req.body.name
                            if (!!req.body.email)
                                userData.email = req.body.email
                            if (!!req.body.password)
                                userData.password = bcrypt.hashSync(req.body.password, 10)
                            let prevUser = await user.findOne({
                                $and: [{ email: req.body.email }, {
                                    _id:
                                        { $ne: userData._id }
                                }]
                            })
                            if (!!prevUser)
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: 'User Already Exists with Same Email'
                                })
                            else {
                                userData.save()
                                    .then(updatedRes => {
                                        res.send({
                                            success: true,
                                            status: 200,
                                            message: 'User/Customer Updated Successfully',
                                            data: updatedRes,
                                        })
                                    })
                                    .catch(error => {
                                        res.send({
                                            success: false,
                                            status: 500,
                                            message: error.message
                                        })
                                    })
                            }
                        }})
                        .catch(error=>{
                            res.send({
                                success: false,
                                status: 500,
                                message: error.message
                            })
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

module.exports = {addCustomer, getCustomer, getSingleCustomer, updateCustomer,}