import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import BookListing from './pages/BookListing';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import { useFirebase } from './context/Firebase';
import LandingPage from './pages/LandingPage';

const App = () => {
  const { isLoggedIn } = useFirebase();

  return (
    <div>
      <Navbar />
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Navigate to="/welcome" />} />}
        {isLoggedIn && <Route path="/" element={<Home />} />}
        <Route path='/welcome' element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<BookListing />} />
        <Route path="/book/view/:bookId" element={<Detail />} />
        <Route path="/book/orders" element={<Orders />} />
        <Route path="/book/orders/:bookId" element={<OrderDetail />} />
      </Routes>
    </div>
  );
};

export default App;
