import { useState, useEffect } from 'react'
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Index from './pages/index'
import Sell from './pages/sell'
import Cart from './pages/cart'
import Buy from './pages/buy'
import DeliveryAddress from './pages/deliveryAddress'
import DeliveryAddressSC from './pages/deliveryAddressSC'
import KakaoPaymentApprove from './pages/kakaoPaymentApprove'
import Delivery from './pages/delivery'
import Detail from './pages/detail'
import Login from './pages/login'
import ProductList from './pages/productList'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/sell" element={<Sell/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/buy" element={<Buy/>} />
                <Route path="/deliveryAddress" element={<DeliveryAddress/>} />
                <Route path="/deliveryAddressSC" element={<DeliveryAddressSC/>} />
                <Route path="/kakaoPayment/approve" element={<KakaoPaymentApprove/>}/>
                <Route path="/delivery" element={<Delivery/>}/>
                <Route path="/detail" element={<Detail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/listAll/:category/:smallCategory" element={<ProductList key={window.location.pathname}/>}/>
                <Route path="/listAll/:category" element={<ProductList key={window.location.pathname}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
