const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./server/config/db')
const seed = require('./server/config/seed')
const adminRoutes= require('./server/routes/adminRoutes')
const customerRoutes= require('./server/routes/customerRoutes')

app.use(express.urlencoded({extended: false}))


app.get('/',(req,res)=>{
    res.send('Welcome to the Server')
})

app.use(cors())

app.use('/admin',adminRoutes)
app.use('/customer',customerRoutes)

app.listen(2000,(err)=>{
    if(err){
    console.log('Error in Server', err.message)}
    else{
        console.log('Server is Running')
    }
})