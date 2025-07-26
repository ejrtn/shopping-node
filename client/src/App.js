import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Index from './pages/index'
import Sell from './pages/sell'
import Cart from './pages/cart'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/sell" element={<Sell/>} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
