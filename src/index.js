import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, MainPage}  from "./pages/index";
import { Header } from "./pages/components/index";
import { Provider } from "react-redux";
import store from "./store";
import { RegisterPage } from "./pages/index";

// import ProductPage  from './pages/Product-Page/ProductPage';
// import Busket from './pages/Busket/Busket';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Busket />
  // <LoginPage />
  // <ProductPage />
// 
<Provider store={store}>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/users" element={<div>Users</div>} />
      <Route path="/post/post:id" element={<div>Single Post</div>} />
      <Route path="*" element={<MainPage />}
      <Route path="/post/" element={<div>New Post</div>} /> */}
    </Routes>
  </BrowserRouter>
  </Provider>
);
