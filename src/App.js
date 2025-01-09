import React from "react";
// import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Feed from "./components/feed/Feed";
import Rightbar from "./components/rightbar/Rightbar";
import Profile from "./components/profile/Profile";

const App = () => {
  return (
    // <div>
    //   <Home />
    // </div>
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default App;
