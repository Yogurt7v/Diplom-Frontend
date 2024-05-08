import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Busket, LoginPage, MainPage, ProductPage } from "./pages/index";
import { Provider } from "react-redux";
import { ERROR } from "./constants";
import store from "./store";
import { RegisterPage,ErrorPage, AdminPanel, PaymentPage, ReportPage} from "./pages/index";
import { VideoBackground, ProtectedRoute, Modal } from "./pages/components";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products/:id/edit" element={<ProductPage />} />
        <Route path="/busket" element={<Busket />} />
        <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage error={ERROR.PAGE_NOT_EXIST} />} />
      </Routes>
      <VideoBackground />
      <Modal/>
    </BrowserRouter>
  </Provider>
);
