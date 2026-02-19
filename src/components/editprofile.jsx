import { useState } from "react";
import ProfileCard from "./profilecard";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age||"");
  const [gender, setgender] = useState(user.gender||"");
  const [about, setabout] = useState(user.about||"");
  const [photourl, setphotourl] = useState(user.photourl);
  const [error, setError] = useState("");
  const [showToast,setShowToast]=useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photourl,
        },
        { withCredentials: true },
      );
      
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },3000);
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <div> Update Profile</div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input
                type="text"
                value={firstName}
                className="input "
                onChange={(e) => setfirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setlastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                className="input"
                onChange={(e) => setage(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-base-100 border-white/30 "
                >
                  {gender}
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a
                      onClick={() => {
                        setgender("male");
                      }}
                    >
                      Male
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setgender("female");
                      }}
                    >
                      Female
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setgender("other");
                      }}
                    >
                      Other
                    </a>
                  </li>
                </ul>
              </div>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                className="input"
                onChange={(e) => setabout(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">photo</legend>
              <input
                type="text"
                value={photourl}
                className="input"
                onChange={(e) => setphotourl(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center p-5">
              <button className="btn btn-primary " onClick={saveProfile}>
                Update profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileCard
        user={{ firstName, lastName, age, gender, about, photourl }}
      />
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated Successfully</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
