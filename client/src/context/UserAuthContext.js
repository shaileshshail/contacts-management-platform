import { createContext, useContext, useEffect } from "react";

import { useState } from "react";
import axios from '../components/api/axios';
import { get } from "react-hook-form";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const signUp = async (firstname,lastname, email, password) => {
        const REGISTER_URL = 'api/users/register';
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstname,lastname, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,

                }
            );
            console.log("response data", response.data);
            console.log("accesstoken", response.accessToken);
            console.log("response data", JSON.stringify(response.data));
            return "Registration Successfull";
        } catch (err) {
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "User already registered"

        }

    }

    const logIn = async (email, password) => {
        const LOGIN_URL = 'api/users/login';

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log("response data", response.data);
            console.log("accesstoken", response.data.accessToken);

            //helper function
            getCurrentUser(response?.data.accessToken);
  
            return JSON.stringify(response?.data);
        } catch (err) {
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }


    const logOut = async () => {
        const LOGOUT_URL = 'api/users/logout';
        try {
            const response = await axios.get(LOGOUT_URL,

                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setUser(null);
        } catch (err) {
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }
    
    //Google section

    const googleLogin=async(credentialResponse)=>{
        const GOOGLE_LOGIN='api/users/google/login'
        try {
            const response = await axios.post(GOOGLE_LOGIN,
                {accessToken:credentialResponse},
                {
                    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${credentialResponse.credential}` },
                    withCredentials: true,
                });
            console.log("response",response.data)
            
            //helper function
            getCurrentUser(response?.data.accessToken);
        } catch (err) {
            console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Email not registered"
        }
    }
    const googleRegister=async(credentialResponse)=>{
        const GOOGLE_REGISTER='api/users/google/register'
        try {
            const response = await axios.post(GOOGLE_REGISTER,
                {accessToken:credentialResponse},
                {
                    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${credentialResponse.credential}` },
                    withCredentials: true,
                });
            console.log("response",response.data)
            return "Registration Successfull"
        } catch (err) {
            console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Email already registered"
        }
    }



    const getCurrentUser=async(accessToken)=>{
        const CURRENTUSER_URL = 'api/users/currentuser';
        try {
            const currentUser = await axios.get(CURRENTUSER_URL,
                
                {
                    headers: { 'Content-Type': 'application/json',
                    "Authorization":`Bearer ${accessToken}`  },
                    withCredentials: true,
                });
            console.log("currentuser",currentUser);
            setUser({"email":currentUser?.data.email,"accessToken":accessToken});
        } catch (err) {
            console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }

    const check = async () => {
        const REFRESH_URL = 'api/refresh';
        console.log("check")
        try {
            const response = await axios.get(REFRESH_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            console.log("response",response.data)
            
            //helper function
            getCurrentUser(response?.data.accessToken);
            
        } catch (err) {
            console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }
    useEffect(() => {
        setUser(null);
        check();

    }, []);

    return (
        <userAuthContext.Provider value={{ user, signUp,
         logIn, logOut ,
         googleLogin,googleRegister }}>
            {children}
        </userAuthContext.Provider>
    );
};



//instead of creating useContext in every component , we import it from this UserAuthContext
export const useUserAuth = () => {
    return useContext(userAuthContext);
}