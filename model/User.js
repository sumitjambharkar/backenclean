const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type: String,
        require : true
    },
    password : {
        type : String,
        require :true
    },
    message : {
        type : String,
        require : true
    },
    number : {
        type : String,
        require :true
    },
    address : {
        type : String,
        require :true
    },
    remark : {
        type : String,
        require :true
    },
    landmark :{
        type : String,
        require :true

    },
    service : {
        type : String,
        require :true
    }
})

module.exports = mongoose.model('User',userSchema)