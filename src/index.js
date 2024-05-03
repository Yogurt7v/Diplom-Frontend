import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Busket, LoginPage, MainPage, ProductPage } from "./pages/index";
import { Provider } from "react-redux";
import { ERROR } from "./constants";
import store from "./store";
import { RegisterPage } from "./pages/index";
import { ErrorPage } from "./pages/Error-page";
import { AdminPanel } from "./pages/Admin-panel";
import { Modal } from "./pages/components/modal";
import { PaymentPage } from "./pages/Payment-page/Payment-Page";
import { VideoBackground } from "./pages/components";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products/:id/edit" element={<ProductPage />} />
        <Route path="/busket" element={<Busket />} />
        <Route path="*" element={<ErrorPage error={ERROR.PAGE_NOT_EXIST} />} />
      </Routes>
      <VideoBackground />
      <Modal/>
    </BrowserRouter>
  </Provider>
);
