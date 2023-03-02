import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const ProductList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
 const [deleteData,setDeleteData] = useState([]);
console.log("hello",deleteData)
const role = JSON.parse(localStorage.getItem('role'));
// console.log(("my role is",role));

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/api/get/all",{
      headers:{
        authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    result = result.result;
    // console.log(result);
    if (result.error) {
      return alert(result.error);
    } else {
      setData(result);
    }
  };


const handleDelete = async()=>{
const ids = deleteData;
// console.log(data,"data here delteData");
let result = await fetch(`http://localhost:8000/api/delete-product`,{
  method:'post',
  body:JSON.stringify({ids}),
  headers:{
    'Content-Type':'application/json',
    authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`

  }
})
result = await result.json();
// console.log('hers is',result);
if(result.error){
  return alert(result.error)
}else{
  alert(result.message)
  getProducts()
}
}



const handleAddToCart = async(productId)=>{
  const _productId = productId;
   const userId = JSON.parse(localStorage.getItem("user"))._id;
      console.log({productId:_productId, userId});

      let result = await fetch(`http://localhost:8000/api/add-to-cart`,{
        method:"post",
        body:JSON.stringify({productId:_productId,userId}),
        headers:{
          'Content-Type':'application/json',
      authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`  
        }
      })

      result = await result.json();
      // console.log("add to cart is",result);
    
      if(result.error){
        return alert(result.errro)
      }else{
        alert(result.message);
      }
      

}



  return (
    <>

      <h1> All the product is here</h1>
{
  deleteData.length>0 && 
  <div style={{display:'flex', justifyContent:'center',marginTop:'20px'}}>
      <button className="btn" onClick={handleDelete}>DELETE SELECTED</button>
  
  </div>
}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => {
          return (
            <div
              style={{
                margin: "50px 30px",
                background: "#eee",
                width: "27%",
              }}
              key={item._id}
            >
              <img style={{ width: "100%", height: "300px" }} src={item.url} />
              <p>
                {item.name} | {item.category}
              </p>
              <p>{item.seller}</p>
              <p>PRICE:{item.price}</p>
             { role === 'Admin' && <button
                onClick={() => {
                  // console.log(item._id, "55");   
                  navigate(`/update/product/${item._id}`);
                }}
              >
                Edit
              </button>}


            { role==='Admin' && <input onChange={(e)=>{
                console.log(e.target.checked,"3444");
                if(e.target.checked === true){
                  setDeleteData([...deleteData,item._id])
                }else{
                  setDeleteData(deleteData.filter(
                    s=>s !== item._id
                  ))
                }
              }}
               type="checkbox"/>}

               <button onClick={()=>handleAddToCart(item._id)}
               >Add to cart</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
