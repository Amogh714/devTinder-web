import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionslice";
const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return<>no connections</>;
  if (connections.length === 0) return <> no connections yet</>;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Connections</h2>
      <div className="space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, photourl, about } =
            connection;
          return (
            <div key={_id} className="bg-base-300 rounded-box shadow-md p-4 w-1/2 mx-auto">
              <div className="flex items-center gap-4">
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
                    <div className="text-sm mt-1 opacity-80">
                      {about}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};
export default Connections;
