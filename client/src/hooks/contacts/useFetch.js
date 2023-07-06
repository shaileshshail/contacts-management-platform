import { useState, useEffect } from "react";
import axios from "../../components/api/axios";
import { useUserAuth } from "../../context/UserAuthContext";

const useFetch = (obj) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const {user}=useUserAuth();
    const CONTACTS_URL = '/api/contacts/';
    useEffect(()=>{
        setLoading(true);
        axios
        .get(CONTACTS_URL,{
            headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${user?.accessToken}` },
            withCredentials: true,
        })
        .then((response)=>{
            setData(response.data);

        })
        .catch((err)=>{
            setError(err);
        }).finally(()=>setLoading(false));
    },[obj]);

    return {data,loading,error};

};

export default useFetch;

