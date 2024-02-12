import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login-Page/LoginPage";
import MainPage from "./pages/Main-Page/MainPage";
// import ProductPage  from './pages/Product-Page/ProductPage';
// import Busket from './pages/Busket/Busket';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Busket />
  // <LoginPage />
  // <ProductPage />

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<div>Registration Page</div>} />
        <Route path="/users" element={<div>Users</div>} /> */}
      {/* <Route path="/post/post:id" element={<div>Single Post</div>} /> */}
      {/* <Route path="*" element={<MainPage />} />
        <Route path="/post/" element={<div>New Post</div>} /> */}
    </Routes>
  </BrowserRouter>
);
