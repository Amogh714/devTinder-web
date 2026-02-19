import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./profilecard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addFeed } from "../utils/feedslice";
import { useEffect } from "react";


const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed)
    
    const getFeed=async ()=>{
        try{
            const res=await axios.get(BASE_URL+"/feed",
                {withCredentials:true})
                dispatch(addFeed(res.data));
        }catch(err){
            console.log(err);
        }
    };

useEffect(()=>{
    if(!feed){
    getFeed();}
},[]);
if(!feed){
    return;
}
return (
  <div className="flex justify-center my-10 mx-10">
    {feed.length > 0 && feed[0] ? (
      <ProfileCard user={feed[0]} />
    ) : (
      <div>No more users</div>
    )}
  </div>
);

    
}

export default Feed;