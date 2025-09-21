import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      
      <div className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition">
        MyApp
      </div>

     
      <div className="flex items-center gap-4">
        <FaUserCircle className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 transition" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        onClick={()=>{
          navigate('/login');
        }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
