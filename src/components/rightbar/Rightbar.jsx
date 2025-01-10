import { miscAssets, personImages } from "../../assets/assetExports.js";
import { Users } from "../../data/mockData.js";
import Online from "../online/Online.jsx";
import "./rightbar.css";

const Rightbar = ({ profile }) => {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={miscAssets.gift} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={personImages.person1}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Veronica Floresn</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={personImages.person2}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Scott Torres</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={personImages.person3}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Melissa Prater</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={personImages.person4}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Katherine Johnson</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={personImages.person5}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jessica Howard</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={personImages.person6}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Shirley Beauchamp</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
