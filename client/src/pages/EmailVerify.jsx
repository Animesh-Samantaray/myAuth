import React from "react";
import { toast } from "react-toastify";
import axios from 'axios';
  import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const EmailVerify = () => {
   const {backendUrl} = useContext(AppContext);
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
          placeholder="Enter OTP"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
        >
          Submit
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
