import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Index from './pages/index'
import Sell from './pages/sell'
import Cart from './pages/cart'
import Buy from './pages/buy'
import DeliveryAddress from './pages/deliveryAddress'
import DeliveryAddressSC from './pages/deliveryAddressSC'
import KakaoPaymentApprove from './pages/kakaoPaymentApprove'

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
