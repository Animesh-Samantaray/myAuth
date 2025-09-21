import React, { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin , setIsLoggedin] = useState(false);
const [userData , setUserData] = useState(null);
    const getUserData = async()=>{
        try{
            const {data} =await axios.get(backendUrl+'/api/user/data',{ withCredentials: true });  

            data.success ? setUserData(data.userData):toast.error(data.message)
        }
        catch(err){

        }
    }
    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,getUserData
    }
     
    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    )
}
