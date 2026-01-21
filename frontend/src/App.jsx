import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Players from './pages/Players';
import News from './pages/News';
import Clothes from './pages/Clothes';
import History from './pages/History';
import Fans from './pages/Fans';
import './App.css';
import FF1s from './components/FF1s';
import U19s from './components/U19s';
import Shops from './components/Shops';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ProductDetail from './components/Product.jsx';
import Cart from "./components/Cart.jsx";
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';
import { useEffect, useState } from 'react';





function App() {
    const [url, setUrl] = useState('');

    useEffect(() => {
      const storedUrl = localStorage.getItem("url");});
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/tickets"
                        element={<Ticket />}
                    ></Route>
                    <Route
                        path="/players"
                        element={<Players />}
                    >
                        <Route
                            path="ff1s"
                            element={<FF1s />}
                        />
                        <Route
                            path="u19s"
                            element={<U19s />}
                        />
                    </Route>
                    <Route
                        path="/news"
                        element={<News />}
                    ></Route>
                    <Route
                        path="/shops"
                        element={<Shops />}
                    >
                        <Route
                        path="clothes"
                        element={<Clothes />}
                        />
                       
                    </Route>
                     <Route
                            path="/product/:id"
                            element={<ProductDetail/>}
                            />
                    <Route
                        path="/history"
                        element={<History />}
                    ></Route>
                    <Route
                        path="/register"
                        element={<Register />}
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login />}
                        ></Route>
                        <Route path="/cart" element={<Cart />} />   
                    <Route
                        path="/fans"
                        element={<Fans />}
                    ></Route>
                    <Route
                        path="/success"
                        element={<Success />}
                    ></Route>
                    <Route
                        path="/cancel"
                        element={<Cancel />}
                    ></Route>
                    <Route
                        path={url}
                        element={<Cart />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
