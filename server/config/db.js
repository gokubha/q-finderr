const mongoose= require('mongoose')
        mongoose.connect('mongodb://127.0.0.1/q-finder')
        
        .then(()=>{
            console.log('Database Connected')
        })
        .catch((err)=>{
            console.log('error in db connection ',err)
        })