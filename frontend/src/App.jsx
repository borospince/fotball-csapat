import { useState } from 'react';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Players from './pages/Players';
import News from './pages/News';
import Clothes from './pages/Clothes';
import History from './pages/History';
import Fans from './pages/Fans';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route paht='/' element={<Home/>} />
          <Route paht='/Ticket' element={<Ticket/>}>

          </Route>
          <Route paht='/Players' element={<Players/>}>
          
          </Route>
          <Route paht='/News' element={<News/>}>
          
          </Route>
          <Route paht='/Clothes' element={<Clothes/>}>
          
          </Route>
          <Route paht='/History' element={<History/>}>
          
          </Route>
          <Route paht='/Fans' element={<Fans/>}>
          
          </Route>
        </Routes>

    </BrowserRouter>
  )
}

export default App
