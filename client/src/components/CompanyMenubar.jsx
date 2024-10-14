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

  const handlePostjob = () => {
    navigate("/postjob");
  };

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
        <div className="menu-item">
          <DashboardIcon />
          {navbar && <p className="menu-text">Dashboard</p>}
        </div>

        {/* Post Job Menu Item */}
        <div className="menu-item" onClick={handlePostjob}>
          <PostAddIcon />
          {navbar && <p className="menu-text">Post Job</p>}
        </div>

        {/* Previous Jobs Menu Item */}
        <div className="menu-item">
          <WorkIcon />
          {navbar && <p className="menu-text">Previous Jobs</p>}
        </div>

        {/* Current Jobs Menu Item */}
        <div className="menu-item">
          <WorkIcon />
          {navbar && <p className="menu-text">Current Jobs</p>}
        </div>

        {/* Bookmarked Jobs Menu Item */}
        <div className="menu-item">
          <BookmarkIcon />
          {navbar && <p className="menu-text">Bookmarked Jobs</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyMenubar;
