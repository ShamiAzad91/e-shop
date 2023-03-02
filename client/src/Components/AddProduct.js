import React, { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
 const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !seller || !image) {
      alert("plz add all the fields");
      return false;
    }

    // console.log(image,name, price, category, seller);
    //  console.log(userId)
    // console.log("token is ",localStorage.getItem('token'));

    let result = await fetch("http://localhost:8000/api/add", {
      method: "post",
      body: JSON.stringify({ url:image, name,price,category,seller }),
      headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    result = await result.json();
    // console.log(result);
    if(result.error){
        return alert(result.error)

    }else{
        alert(result.message);
    navigate("/")

    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="enter product image "
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      

      <input
        className="inputBox"
        type="text"
        placeholder="enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
   

      <input
        className="inputBox"
        type="text"
        placeholder="enter product category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    
      <input
        className="inputBox"
        type="text"
        placeholder="enter product seller"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
      />
    

      <button onClick={addProduct} className="btn" type="button">
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
