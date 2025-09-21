import React, { useState , useContext} from "react";
import { FaUser } from "react-icons/fa"; // person icon
import axios from 'axios';
import { MdEmail } from "react-icons/md"; // email icon
import { RiLockPasswordLine } from "react-icons/ri"; // password icon
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { getUserData } from "../../../server/controllers/userController";
const Login = () => {
  const [state, setState] = useState("sign up");
  const[email,setEmail] = useState('');
    const[name,setName] = useState('');
      const[password,setPassword] = useState('');
      const navigate = useNavigate();
      const {backendUrl,isLoggedin,setIsLoggedin} = useContext(AppContext);

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
          toast.error(data.message);
        }
      }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Titles */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {state === "sign up" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {state === "sign up"
            ? "Create your account here"
            : "Login to your account"}
        </p>

        {/* Form */}
        <form className="space-y-4"
        onSubmit={onSubmitHandle}
        >
          {state === "sign up" && (
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-400 mr-3 text-lg" />
              <input
                type="text"
                name="name"
                value={name}
                required
                placeholder="Full Name"
                className="w-full outline-none text-gray-700"
                onChange={(e)=>{
                  setName(e.target.value)
                }}
              />
            </div>
          )}

          {/* Email Input */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <MdEmail className="text-gray-400 mr-3 text-lg" />
            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="Email Address"
              className="w-full outline-none text-gray-700"
              onChange={(e)=>{
                  setEmail(e.target.value)
                }}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <RiLockPasswordLine className="text-gray-400 mr-3 text-lg" />
            <input
              type="password"
              name="password"
              value={password}
              required
              placeholder="Enter Password"
              className="w-full outline-none text-gray-700"
              onChange={(e)=>{
                  setPassword(e.target.value)
                }}
            />
          </div>

          {/* Forgot Password */}
          {
          state==='login' &&
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={()=>navigate('/reset-password')}
            >
              Forgot password?
            </button>
          </div>
          }

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            {state === "sign up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center text-gray-600">
          {state === "sign up" ? (
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-600 font-semibold hover:underline"
                onClick={() => setState("login")}
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-semibold hover:underline"
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
