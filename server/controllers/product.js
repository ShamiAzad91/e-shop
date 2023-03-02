const Product = require("../models/product");

exports.addProduct = async(req,res)=>{
    try {
        // const {name,price,url,category,seller} = req.body;
        // if(!name|| !price|| !url||!category||!seller)
        // return res.status(422).json({error:"plz include all the fields",status:"failed"})
        const product = new Product(req.body);
        const result = await product.save();
        if(!result)
        return res.status(400).json({error:"unable to add the product",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  added the product",status:"success"});



        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
    }
}

exports.getAllProduct = async(req,res)=>{
    try {
        // console.log("get token role",req.role)
        const result = await Product.find();
        if(result.length<0)
        return res.status(400).json({error:"unable to get the product",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  get all the product",status:"success"});



        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        
        let product = {};
        if(req.body.name){
            product.name = req.body.name
        }
        if(req.body.url){
            product.url = req.body.url
        }
        if(req.body.price){
            product.price = req.body.price
        }
        if(req.body.category){
         product.category= req.body.category
        }
 
        if(req.body.seller){
            product.seller = req.body.seller
        }

        const id = req.body.id;
        let filter = {_id:id}

        let result = await Product.findOneAndUpdate(filter,product,{new:true});
        if(!result)
        return res.status(400).json({error:"unable to update the product",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  updated the product",status:"success"});



        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}

exports.getProductById = async(req,res)=>{
    try {
        let result = await Product.findById(req.params.id);
        if(!result)
        return res.status(400).json({error:"unable to get the product details",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  get the product",status:"success"});

        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}
// Delete multiple users
// exports.deletemultipleusers = async (req, res) => {
//     let arrayids = req.body.userids;
//     await Users.deleteMany({ _id: { $in: arrayids } });
//     return res.status(200).json({ err: '', msg: 'Users deleted successfully!', status: 'success' });
//   };

exports.deleteProducts = async(req,res)=>{
    try {
        let ids = req.body.ids;
        // console.log(typeof(ids));
        // console.log("ids is",ids);
        let result = await Product.deleteMany({_id:{$in:ids}});
        if(!result)
        return res.status(400).json({error:"unable to delete the product details",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  deleted the product",status:"success"});


        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}