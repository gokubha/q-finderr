const userInfo = require('./userInfoModel')
const bcrypt = require('bcrypt')

const addUserInfo= async(req,res)=>{
    let validation =''
    if(!req.body.name)
        validation += 'name is required, '
    if(!req.body.email)
        validation += 'email is required, '
    if(!req.body.password)
        validation += 'password is required, '
    if(!req.body.gender)
        validation += 'gender is required, '
    if(!req.body.city)
        validation += 'city is required, '
    if(!req.body.state)
        validation += 'state is required, '
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total =await userInfo.countDocuments()
    let newUserInfo= new userInfo({
    userInfoId: total+1,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,10),
    gender: req.body.gender,
    city: req.body.city,
    state: req.body.state,
    })
    let prevCategory = await userInfo.findOne({
        email:req.body.email
    })
    if(!!prevCategory)
    res.send({
        success: false,
        status:500,
        message:'userInfo Already Exists with Same Email'
    })
    else
    newUserInfo.save()
.then((result)=>{
    res.json({
        success: true,
        status: 200,
        message: "New UserInfo Added Successfully",
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

const getUserInfo = async(req,res)=>{
    let total=await userInfo.countDocuments()
    userInfo.find(req.body)
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"UsersInfo Loaded Successfully",
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

const getSingleUserInfo = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    userInfo.findOne({_id:req.body._id})
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:"No UserInfo Found"
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single UserInfo Loaded",
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


    const updateUserInfo=(req,res)=>{
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
            userInfo.findOne({_id: req.body._id})
            .then(async result=>{
                if(result==null)
                res.send({
                    success:false,
                    status:500,
                    message:'No UserInfo Found'
                })
                else{
                    if(!!req.body.name)
                    result.name= req.body.name
                    if(!!req.body.email)
                    result.email= req.body.email
                    if(!!req.body.password)
                    result.password=bcrypt.hashSync(req.body.password,10)
                    if(!!req.body.gender)
                    result.gender= req.body.gender
                    if(!!req.body.city)
                    result.city= req.body.city
                    if(!!req.body.state)
                    result.state= req.body.state
                    let prevuserInfo = await userInfo.findOne({
                    $and:[{email: req.body.email}, {_id:
                    {$ne:result._id}}]
                     })
                     if(!!prevuserInfo)
                        res.send({
                        success: false,
                        status:500,
                        message:'UserInfo Already Exists with Same Email'
                    })
                    else{
                    result.save()
                    .then(updatedRes=>{
                        res.send({
                            success:true,
                            status:200,
                            message:'UserInfo Updated Successfully',
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


module.exports= {addUserInfo, getUserInfo, getSingleUserInfo, updateUserInfo,}