import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, MainPage, ProductPage } from "./pages/index";
import { Header } from "./pages/components/index";
import { Provider } from "react-redux";
import { ERROR } from "./constants";
import store from "./store";
import { RegisterPage } from "./pages/index";
import { ErrorPage } from "./pages/Error-page";
import { AdminPanel } from "./pages/Admin-panel";
import { Modal } from "./pages/components/modal";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        {/* <Route path="/users" element={<div>Users</div>} /> */}
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products/:id/edit" element={<ProductPage />} />
        <Route path="*" element={<ErrorPage error={ERROR.PAGE_NOT_EXIST} />} />
      </Routes>
      <Modal/>
    </BrowserRouter>
  </Provider>
);
