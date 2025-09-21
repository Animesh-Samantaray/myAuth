import React, { useState , useContext} from "react";
import { FaUser } from "react-icons/fa"; 
import axios from 'axios';
import { MdEmail } from "react-icons/md"; 
import { RiLockPasswordLine } from "react-icons/ri"; 
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("sign up");
  const[email,setEmail] = useState('');
  const[name,setName] = useState('');
  const[password,setPassword] = useState('');
  const navigate = useNavigate();
  const {backendUrl,isLoggedin,setIsLoggedin , getUserData} = useContext(AppContext);

  const onSubmitHandle= async(e)=>{
    try{
      e.preventDefault();
      axios.defaults.withCredentials=true;

      if(state==='sign up'){
        const {data}= await axios.post(backendUrl+'/api/auth/register' , {
          name,email,password
        });

        if(data.success){
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        }
        else{
          toast.error(data.message)
        }
      }else{
        const {data}= await axios.post(backendUrl+'/api/auth/login' , {
          email,password
        });

        if(data.success){
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(err){
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
        
        {/* Titles */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-3">
          {state === "sign up" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          {state === "sign up"
            ? "Sign up to get started with your journey"
            : "Login to continue your experience"}
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmitHandle}>
          {state === "sign up" && (
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <FaUser className="text-gray-400 mr-3 text-lg" />
              <input
                type="text"
                name="name"
                value={name}
                required
                placeholder="Full Name"
                className="w-full outline-none text-gray-700 text-sm"
                onChange={(e)=> setName(e.target.value)}
              />
            </div>
          )}

          {/* Email Input */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <MdEmail className="text-gray-400 mr-3 text-lg" />
            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="Email Address"
              className="w-full outline-none text-gray-700 text-sm"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <RiLockPasswordLine className="text-gray-400 mr-3 text-lg" />
            <input
              type="password"
              name="password"
              value={password}
              required
              placeholder="Enter Password"
              className="w-full outline-none text-gray-700 text-sm"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password */}
          {state==='login' && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
                onClick={()=>navigate('/reset-password')}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 font-semibold transition-all duration-200"
          >
            {state === "sign up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          {state === "sign up" ? (
            <p>
              Already have an account?{" "}
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={() => setState("login")}
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <button
                className="text-indigo-600 font-semibold hover:underline"
                onClick={() => setState("sign up")}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
