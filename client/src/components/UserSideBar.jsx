import React, { useState } from "react";
import "./UserSidebar.css";
import { useNavigate } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";

const UserSidebar = () => {
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

  const handleAppliedJobs = () => {
    navigate("/user/home");
  };

  const handleBookmarkedJobs = () => {
    navigate("/user/bookmarks");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleToggle = () => {
    setNavbar(!navbar);
  };

  return (
    <div className={`user-sidebar ${navbar ? "" : "user-collapsed"}`}>
      <div>
        <div
          className="user-menu-header"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p className="user-menu-text">{navbar && "Menu"}</p>
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

        {/* Applied Jobs Menu Item */}
        <div className="user-menu-item" onClick={handleAppliedJobs}>
          <WorkIcon />
          {navbar && <p className="user-menu-text">Applied Jobs</p>}
        </div>

        {/* Bookmarked Jobs Menu Item */}
        <div className="user-menu-item" onClick={handleBookmarkedJobs}>
          <BookmarkIcon />
          {navbar && <p className="user-menu-text">Bookmarked Jobs</p>}
        </div>

        {/* Profile Menu Item */}
        <div className="user-menu-item" onClick={handleProfile}>
          <PersonIcon />
          {navbar && <p className="user-menu-text">Profile</p>}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
