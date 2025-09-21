import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  } = useContext(AppContext);
  const navigate = useNavigate();

const sendVerificationOtp = async(req,res)=>{
  try{
    axios.defaults.withCredentials=true;
const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });

   if (data?.success) {
      toast.success(data.message || 'OTP sent successfully!');
      navigate('/email-verify');
    } else {
      toast.error(data.message || 'Failed to send OTP');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
}

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-md sticky top-0 z-50">
      {/* Brand */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-extrabold text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
      >
        MyApp 🚀
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Profile Icon */}
        <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors" />

        {userData ? (
          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              onClick={async () => {
                axios.defaults.withCredentials = true;
                const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
                if (data.success) {
                  setIsLoggedin(false);
                  setUserData(null);
                  navigate("/");
                }
              }}
            >
              Logout
            </button>

            {!userData.isAccountVerified && (
              <button
                className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                onClick={sendVerificationOtp}
              >
                Verify
              </button>
            )}
          </div>
        ) : (
          <button
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
