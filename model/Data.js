const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    top_name:{
        type:String,
        require:true
    },
    service:{
        type:String,
        require:true
    },
    Descrption:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    menu : 
        [
            {
               fname:{
                type:String,
                require:true
               },
               fprice:{
                type:String,
                require:true      
               },
               fimage:{
                type:String,
                require:true
               }

            }
        ]

})
module.exports = mongoose.model('Data',dataSchema)