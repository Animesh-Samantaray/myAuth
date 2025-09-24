import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
  import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";



const EmailVerify = () => {
  const navigate = useNavigate();
   const {backendUrl,isLoggedIn,userData,getUserData} = useContext(AppContext);

// useEffect(() => {
//   if (isLoggedIn && userData && userData.isVerified) {
//     navigate('/');
//   }
// }, [isLoggedIn, userData, navigate]);



   let [val,setVal] = useState('');
const sendVerificationOtp = async(req,res)=>{

  try{
    axios.defaults.withCredentials=true;
 const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
 if (data?.success) {
      toast.success(data.message || 'OTP sent successfully!');
    } else {
      toast.error(data.message || 'Failed to send OTP');
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
}

const verifyEmailMethod = async(e)=>{
  try{
      e.preventDefault();
        axios.defaults.withCredentials=true;
        const   { data } = await axios.post(`${backendUrl}/api/auth/verify-email`, {otp:val}, { withCredentials: true });

        if(data.success){
          await getUserData();
          toast.success(data.message);
          navigate('/');
        }
        else toast.error(data.message);

  }
  catch(err){
       toast.error(err.message);

  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email account
        </p>

        <input
          type="number"
          required
          value={val}
          min="100000"
           max="999999"
          onChange={(e)=>setVal(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

            <button
      type="submit"
      onClick={verifyEmailMethod}
      className={`w-full py-3 font-semibold rounded-lg shadow transition transform hover:scale-105 ${
        val.length === 6
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
      disabled={val.length !== 6}
    >
      Verify Email
            </button>

        <p className="mt-4 text-gray-500 text-sm">
          Didn't receive OTP?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={sendVerificationOtp}>
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
