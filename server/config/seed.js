const user= require('../apis/user/userModel')
const bcrypt=require('bcrypt')

user.findOne({email:'admin@gmail.com'})
.then(result=>{
    if(result == null){
        let admin = new user({
            userId:1,
            name:'Admin',
            email:'admin@gmail.com',
            password:bcrypt.hashSync('123',10),
            userType:1
        })
        admin.save()
        .then(savedResult=>{
            console.log("Admin Created");
        })  
        .catch(err=>{
            console.log("Error In Admin Creation", err);
        })
    }
    else{
        console.log("Admin Already Exists");
    }
})
.catch(err=>{
    console.log("Error In Admin", err);
})