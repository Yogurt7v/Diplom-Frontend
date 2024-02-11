import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './pages/Main-Page/MainPage';
import { ProductPage } from './pages/Product-Page/ProductPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductPage />
    // <MainPage />
);

