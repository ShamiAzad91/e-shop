import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.log(name, email, password);
    if (!name || !email || !password) {
      alert("plz add all the fields");
      return false;
    }
    let result = await fetch("http://localhost:8000/api/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.error) {
      return alert(result.error);
    } else {
      alert(result.message);
      navigate("/signin");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="inputBox"
        placeholder="enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={collectData} type="button" className="btn">
        Sign up
      </button>
      <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
    </div>
  );
};

export default Signup;
