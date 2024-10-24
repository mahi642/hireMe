import React, { useState } from "react";
import "./CompanyMenubar.css";
import { useNavigate } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const CompanyMenubar = () => {
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();


  const handleDashboard =()=>{
    navigate("/company/dashboard")
  }

  const handlePostjob = () => {
    navigate("/postjob");
  };

  const handleCurrentJobs =()=>{
    navigate("/company/currentjobs");
  }

  const handlePreviousJobs =()=>{
    navigate("/company/previousjobs")
  }

  const handleBookmarkJobs =()=>{
    navigate("/compnay/bookmarks")
  }

  const handleProfile =()=>{
    navigate("/company/profile")
  }



  const handleToggle = () => {
    setNavbar(!navbar);
  };

  return (
    <div className={`menubar ${navbar ? "" : "collapsed"}`}>
      <div>
        <div
          className="menu-header"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p className="menu-text">{navbar && "Menu"}</p>
          <div onClick={handleToggle}>
            {navbar ? <MenuOpenIcon /> : <MenuIcon />}
          </div>
        </div>
        <hr
          style={{
            height: "0.5px",
            backgroundColor: "grey",
            margin: "0.5rem 0",
          }}
        />

        {/* Dashboard Menu Item */}
        <div className="menu-item" onClick={handleDashboard}>
          <DashboardIcon />
          {navbar && <p className="menu-text">Dashboard</p>}
        </div>

        {/* Post Job Menu Item */}
        <div className="menu-item" onClick={handlePostjob}>
          <PostAddIcon />
          {navbar && <p className="menu-text">Post Job</p>}
        </div>

        <div className="menu-item" onClick = {handleCurrentJobs}>
          <WorkIcon />
          {navbar && <p className="menu-text">Current Jobs</p>}
        </div>

        <div className="menu-item" onClick={handlePreviousJobs}>
          <WorkIcon />
          {navbar && <p className="menu-text">Previous Jobs</p>}
        </div>



        {/* Current Jobs Menu Item */}

        {/* Bookmarked Jobs Menu Item */}
        <div className="menu-item" onClick={handleBookmarkJobs}>
          <BookmarkIcon />
          {navbar && <p className="menu-text">Bookmarked </p>}
        </div>

        <div className="menu-item" onClick={handleProfile}>
          <BookmarkIcon />
          {navbar && <p className="menu-text">Profile</p>}
          </div>
      </div>
    </div>
  );
};

export default CompanyMenubar;
