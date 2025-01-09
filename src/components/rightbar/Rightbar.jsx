import { miscAssets } from "../../assets/assetExports.js";
import { Users } from "../../data/mockData.js";
import Online from "../online/Online.jsx";
import "./rightbar.css";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={miscAssets.gift} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={miscAssets.ad} alt="" />
        <div className="rightbarTitle">Online Friends</div>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
