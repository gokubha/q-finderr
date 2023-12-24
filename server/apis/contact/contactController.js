const contact = require('./contactModel')

const addContact = async(req,res)=>{
    let validation =''
    if(!req.body.name)
        validation += 'name is required, '
    if(!req.body.email)
        validation += 'email is required, '
    if(!req.body.subject)
        validation += 'subject is required, '
    if(!req.body.message)
        validation += 'message is required, '
    if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    let total=await contact.countDocuments()
    let addContact= new contact({
        contactId: total+1,
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    })
    addContact.save()
.then((result)=>{
    res.json({
        success: true,
        status: 200,
        message: "New Contact Added Successfully",
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


const getContact = async(req,res)=>{
    let total=await contact.countDocuments()
    contact.find(req.body)
    .then(result=>{
        res.json({
            success:true,
            status:200,
            total: result.length,
            message:"Contacts Loaded Successfully",
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


const getSingleContact = (req, res)=>{
    let validation =''
    if(!req.body._id)
        validation += '_id is required, ' 
        if(!!validation)
        res.send({success:false, status:300, message:validation})
    else{
    contact.findOne({_id:req.body._id})
    .then(result=>{
        if(result==null)
        res.send({
            success:false,
            status:500,
            message:'No Contact Found'
        })
        else
        res.json({
            success:true,
            status:200,
            message:"Single Contact Loaded",
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

module.exports={addContact, getContact, getSingleContact}