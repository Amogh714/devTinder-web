import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeuserfromFeed } from "../utils/feedslice";

const ProfileCard=({user})=>{
  if(!user) return <>no more user</>;
  const{_id,photourl,age,gender,about,firstName,lastName}=user;
  const dispatch=useDispatch();
  const handlerequest=async(status,_id)=>{
    try{
      const res=await axios.post(BASE_URL+"/connection/request/"+status+"/"+_id,{},{withCredentials:true})
      dispatch(removeuserfromFeed(_id));

    }catch(err){
      console.error(err);
    }
  }

    return(user &&(<>
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    {photourl && <img className="my-10"
      src={photourl} alt="Shoes" />}
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age && gender &&(<p>{age + "," + gender}</p>)}
  <p>{about}</p>
    <div className="card-actions justify-center ">
      <button className="btn btn-primary" onClick={()=>handlerequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handlerequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </>))
}

export default ProfileCard;