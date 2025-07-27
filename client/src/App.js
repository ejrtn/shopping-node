import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Index from './pages/index'
import Sell from './pages/sell'
import Cart from './pages/cart'
import Buy from './pages/buy'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/sell" element={<Sell/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/buy" element={<Buy/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
