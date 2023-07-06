import {useState,useEffect} from 'react';
import axios from "../../components/api/axios";
import { useUserAuth } from "../../context/UserAuthContext";


const useAddOne = () => {
    const {user}=useUserAuth();
    
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const CONTACTS_URL = '/api/contacts/';
    const addContact=(form)=>{
        setLoading(true);
        axios
        .post(CONTACTS_URL,JSON.stringify(form),{
            headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${user?.accessToken}` },
            withCredentials: true,
        })
        .then((response)=>{
            setData(response.data);
            console.log(response.data);
        })
        .catch((err)=>{
            setError(err);
        }).finally(()=>setLoading(false));
    };

    return {data,loading,error,addContact};
}

export default useAddOne;
