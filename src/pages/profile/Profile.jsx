import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { personImages } from "../../assets/assetExports";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  // console.log(username);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || personImages.noCover}
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? personImages[user.profilePicture]
                    : personImages.noAvatar
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />{" "}
            {/* In JSX, when a prop is written without an explicit value (e.g., profile), it defaults to true. */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
