import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import PrivateComponent from "./Components/PrivateComponent";
import ProductList from "./Components/ProductList";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import UserCart from "./Components/UserCart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update" element={<h1>update product</h1>} />
          <Route exact path="/update/product/:id" element={<UpdateProduct/>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/cart" element={<UserCart/>} />

          <Route path="/logout" element={<h1>logout components</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
