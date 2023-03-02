import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

 useEffect(() => {
    async function userCartDetails() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
      let result = await fetch('http://localhost:8000/api/get-user-cart',{
        method:'post',
        body:JSON.stringify({userId}),
        headers:{
          'Content-Type':'application/json',
      authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`  
        }

      })
      result = await result.json();
      // console.log("user cart is",result);
      // console.log(result.result.cart);
     setData(result.result.cart);
    }

    userCartDetails()
  }, [])




  return (
    <div>
      <h1> All cart product is here</h1>

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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCart;
