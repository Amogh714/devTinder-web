import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants"

const Login = () => {
    const[emailId,setEmailId]=useState("");
    const[password,setPassword]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[error,setError]=useState("");
    const[signUp,setSignUp]=useState(false);
    const[answer,setAnswer]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlelogin= async ()=>{
      try
      {const res=await axios.post(
        BASE_URL+"/login",{
        emailId,
        password
      },{withCredentials:true})
      dispatch(addUser(res.data))
      navigate("/feed")
      }
      catch(err)
      {
        setError(err?.response?.data||"something went wrong")
      }
      
    }
    const handleSignUp=async()=>{
      try{
        const res=await axios.post(BASE_URL+"/signup",{emailId,
        password,firstName,lastName,answer},{withCredentials:true})
        dispatch(addUser(res.data));
        navigate("/profile")
      }catch(err){
        setError(err?.response?.data||"something went wrong")
      }
    }
    

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <div className="m-auto text-2xl">
              {signUp?("Sign Up"):("Login")}
            </div>
            
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email:</legend>
              <input type="text"
              value={emailId} 
              className="input"
              onChange={(e)=>setEmailId(e.target.value)}
               />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text"
               value={password}
               className="input"
               onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
            {signUp && (<>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input type="text"
               value={firstName}
               className="input"
               onChange={(e)=>setFirstName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input type="text"
               value={lastName}
               className="input"
               onChange={(e)=>setLastName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">where your hometown is(for password verification if forgotten)</legend>
              <input type="text"
               value={answer}
               className="input"
               onChange={(e)=>setAnswer(e.target.value)}/>
            </fieldset>
            </>)}
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center p-5">
              <button className="btn btn-primary " onClick={signUp?handleSignUp:handlelogin}>{signUp?"Sign Up":"Login"} </button>
            </div>
            <div className="m-auto cursor-pointer" onClick={()=>setSignUp((value)=>!value)}>
              {signUp?("already a user? login here"):("New user? sign in here")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
