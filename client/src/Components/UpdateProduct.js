import React, { useEffect, useState } from "react";
import {useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
 const navigate = useNavigate();
 const params = useParams();

 


 useEffect(()=>{
getProductDetails();
 },[])

 const getProductDetails = async()=>{
  let result = await fetch(`http://localhost:8000/api/product/${params.id}`,{
    headers:{
      authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
  })
  result = await result.json();
  result = result.result;
  // console.warn(result);
  setImage(result.url);
  setName(result.name)
  setPrice(result.price);
  setCategory(result.category);
  setSeller(result.seller);

 }

const updateProduct = async()=>{
  // console.warn(name,image,price,category,seller);

  let result = await fetch(`http://localhost:8000/api/update`,{
    method:'post',
    body:JSON.stringify({id:params.id, url:image, name,price,category,seller }),
    headers:{
      'Content-Type':'application/json',
      authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`

    }
  })

  result = await result.json();
  // console.log(result,"hhhh")
  if(result.error){
    return alert(result.error)
  }else{
     alert(result.message);
    navigate("/");
  }

}

  return (
    <div className="product">
    <h1>update Product</h1>

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
  

    <button onClick={updateProduct} className="btn" type="button">
      update product
    </button>
  </div>
  )
}

export default UpdateProduct