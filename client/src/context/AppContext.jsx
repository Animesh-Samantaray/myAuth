import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials=true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

 async function AuthState(){
    try{
        const { data } = await axios.get(backendUrl + "/api/auth/isVerified", {
        withCredentials: true,
        });
        if(data.success){
            setIsLoggedin(true);
            getUserData();
        }

    }
    catch(err){
        toast.error(err.message);
    }
 }


  useEffect(() => {
    getUserData();
    AuthState()
  }, []);


  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
