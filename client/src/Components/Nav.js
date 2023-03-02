import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/signin")
  }

  return (
    <div>
      {
        auth ?    <ul className='nav-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signin">logout</Link></li>
        <li><Link to="/cart">cart</Link></li>


      </ul>
      :
      <ul className="nav-ul nav-right">
      <li><Link to="/signup">Signup</Link></li>  
      <li><Link to="/signin">signin</Link></li>  

  </ul>
      }
   
    </div>
  )
}

export default Nav