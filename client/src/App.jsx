import { useState } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import EmailVerify from './pages/EmailVerify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import MyAppToast from './components/MyAppToast';
function App() {


  return (
    <>
            <MyAppToast />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />

      </Routes>
    </>
  )
}

export default App
