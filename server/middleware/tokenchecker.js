const jwt = require('jsonwebtoken')
const secretKey= 'qfinder0001'

module.exports = (req,res,next)=> {
    let token = req.headers['authorization']
    console.log(token);
    if(!!token)
    jwt.verify(token,secretKey,(err,data)=>{
        if(err)
        res.send({
            success:false,
            status:500,
            message:'Unauthorized Access'
            })
            else
            next()
            })
    else
    res.send({
        success: false,
        status:400,
        message:'No Token Found'
    })        
    }


