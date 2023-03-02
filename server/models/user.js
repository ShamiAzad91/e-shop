const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:'USER'
    },
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    }]
});

module.exports = mongoose.model('User',userSchema);