import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate("/");
    }
   })

  const collectData = async () => {
    console.log(email, password);
    if (!email || !password) {
      alert("plz add all the fields");
      return false;
    }
    let result = await fetch("http://localhost:8000/api/signin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.warn("hhh",result);
    if(result.auth){
         alert(result.message);
           localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            localStorage.setItem("role",JSON.stringify(result.result.role))
            navigate("/")
    
    }else{
      return alert(result.error)
    }
 
  };

  return (
    <div className="register">
      <h1>Login Here!</h1>

      <input
        type="text"
        className="inputBox"
        placeholder="enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={collectData} type="button" className="btn">
        Sign in
      </button>
      <h5>
          <Link to="/signup">Donot have an account ?</Link>
        </h5>
    </div>
  );
};

export default Signin;
