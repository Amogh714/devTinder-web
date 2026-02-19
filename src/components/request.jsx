import { useEffect } from "react";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeUserRequest } from "../utils/requestslice";
import { useNavigate } from "react-router-dom";

const Request = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const navigate =useNavigate();

  const reviewRequest=async(status,_id)=>{
    try{
        const res=await axios.post(BASE_URL+"/connection/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeUserRequest(_id));
    }catch(err){
        console.error(err);
    }
  }
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.requests));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return <>no requests</>;
  if (requests.length === 0) return <> no requests yet</>;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photourl, about } =
            request.fromuserid;
          return (
            <div
              key={_id}
              className="bg-base-300 rounded-box shadow-md p-4 w-2/3 mx-auto"
            >
              <div className="justify-between flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-box object-cover"
                  src={photourl}
                  alt={`${firstName} ${lastName}`}
                />
                <div>
                  <div className="font-semibold text-lg">
                    {firstName} {lastName}
                  </div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age} • {gender}
                    </div>
                  )}
                  {about && (
                    <div className="text-sm mt-1 opacity-80">{about}</div>
                  )}
                </div>
                <div>
                    <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>accept</button>
                    <button className="btn btn-secondary"onClick={()=>reviewRequest("rejected",request._id)}>Secondary</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Request;
