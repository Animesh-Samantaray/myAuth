import React, { useContext } from "react";
import { FaCode } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
const Header = () => {

  const {userData} = useContext(AppContext)
  return (
    <header className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-md">
      {/* Logo */}
      <div className="w-28 h-28 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-xl">
        <FaCode className="text-5xl" />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
        Hiii {userData?.name || 'Developer'} 👋

      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-lg md:text-xl text-gray-600">
        Welcome to our app – let’s build something amazing together!
      </p>

      {/* CTA Button */}
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-105">
        Get Started
      </button>
    </header>
  );
};

export default Header;
