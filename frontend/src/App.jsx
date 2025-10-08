import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Players from './pages/Players';
import News from './pages/News';
import Clothes from './pages/Clothes';
import History from './pages/History';
import Fans from './pages/Fans';
import './App.css';

function App() {
  return (
  <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Ticket' element={<Ticket/>}>
          </Route>
          <Route path='/Players' element={<Players/>}>
          </Route>
          <Route path='/News' element={<News/>}>
          </Route>
          <Route path='/Clothes' element={<Clothes/>}>
          </Route>
          <Route path='/History' element={<History/>}>
          </Route>
          <Route path='/Fans' element={<Fans/>}>
          </Route>  
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App
