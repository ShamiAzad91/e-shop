const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    category:{
        type:String
    },
    seller:{
        type:String
    },
    url:{
        type:String
    },
    price:{
        type:Number
    }
});

module.exports = mongoose.model("Product",productSchema);