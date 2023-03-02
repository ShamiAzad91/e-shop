const User = require('../models/user');

exports.addToCart = async(req,res)=>{
    try {
// console.log(req.body,"hiii");
        let result = await User.updateOne({_id:req.body.userId},{
            $addToSet:{cart:req.body.productId}
        });

        if(!result)
        return res.status(400).json({error:"Unable to add item to cart ",status:"failed"});

        return res.status(200).json({result:result,message:"successfully  added item to cart ",status:"success"});
        
    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
        
    }
}
exports.getUserCart = async(req,res)=>{
    try {
// console.log(req.body,"hiii");
        let result = await User.findOne({_id:req.body.userId }).populate('cart');

        if(!result)
        return res.status(400).json({error:"Unable to get item to cart ",status:"failed"});

        return res.status(200).json({result:result,message:"successfully  get item to cart ",status:"success"});
        
    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
        
    }
}