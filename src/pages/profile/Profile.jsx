import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import { personImages, postImages } from "../../assets/assetExports";

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={postImages.post3} alt="" />
              <img
                className="profileUserImg"
                src={personImages.person7}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Travis Bennett</h4>
              <span className="profileInfoDesc">
                Exploring the world, one connection at a time!
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />{" "}
            {/* In JSX, when a prop is written without an explicit value (e.g., profile), it defaults to true. */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
