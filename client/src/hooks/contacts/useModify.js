import { useState, useEffect } from "react";
import axios from "../../components/api/axios";
import { useUserAuth } from "../../context/UserAuthContext";

const useModify = () => {
    const DELETE_URL='/api/contacts/'
    const UPDATE_URL='/api/contacts/'
    const GET_ONE='/api/contacts/'
    const {user}=useUserAuth();
    const deleteContact =(id)=>{
        axios.delete(DELETE_URL+id,{
            headers:{'Content-Type':'application/json','Authorization':`Bearer ${user?.accessToken}`},
            withCredentials: true,
        })
        .then((response)=>{

        })
        .catch((err)=>{

        })
    }   

    const getOne=async(id)=>{
        const data=await axios.get(GET_ONE+id,{
            headers:{'Content-Type':'application/json','Authorization':`Bearer ${user?.accessToken}`},
            withCredentials: true,
        })
        .then((response)=>{
            return response?.data?.[0];
        })
        .catch((err)=>{

        })
        return data;
    }

    const updateOne=async(form)=>{
        axios
        .put(UPDATE_URL+form._id,JSON.stringify(form),{
            headers: { 'Content-Type': 'application/json',"Authorization":`Bearer ${user?.accessToken}` },
            withCredentials: true,
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
        }).finally(()=>{});
    }
  return {deleteContact,getOne,updateOne};

}

export default useModify