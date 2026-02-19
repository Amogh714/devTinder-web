import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
const Body = () => {
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const FetchUser=async()=>{
    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
      withCredentials:true
    });
    dispatch(addUser(res.data));
    }
    catch(err)
    {
      if(err.response.status===401){
        dispatch(removeUser());
        navigate("/login")
      }
    }
  };
  useEffect(()=>{
    if(!user){FetchUser();}
  },[user]);


  return (<>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
};

export default Body ;
