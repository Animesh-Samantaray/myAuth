import { useState } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAppToast from './components/MyAppToast';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
            <MyAppToast />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/email-verify' element={<EmailVerify />} />

      </Routes>
    </>
  )
}

export default App
