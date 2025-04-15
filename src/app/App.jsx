import './App.scss'

import { Route, Routes, useNavigate } from "react-router";
import { useState, useEffect } from 'react';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

export default function App(){

  const [isAuthUser, setIsAuthUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthUser) {
      navigate("/login");
      return;
    }
  }, []);

  return(
    <>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgotPass' element={<ForgotPassword/>}/>
    </Routes>
    </>
  )
}
