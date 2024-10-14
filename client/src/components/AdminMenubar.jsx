import React, { useState } from "react";
import "./AdminMenubar.css"; // Create a separate CSS file for styling
import { useNavigate } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

const AdminMenubar= () => {
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setNavbar(!navbar);
  };

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleUsers = () => {
    navigate("/admin/users");
  };

  const handleCompanies = () => {
    navigate("/admin/companies");
  };

  return (
    <div className={`admin-home`}>
      <div className={`menubar ${navbar ? "" : "collapsed"}`}>
        <div className="menu-header">
          <p className="menu-text">{navbar && "Menu"}</p>
          <div onClick={handleToggle}>
            {navbar ? <MenuOpenIcon /> : <MenuIcon />}
          </div>
        </div>
        <hr className="menu-divider" />

        {/* Dashboard Menu Item */}
        <div className="menu-item" onClick={handleDashboard}>
          <DashboardIcon />
          {navbar && <p className="menu-text">Dashboard</p>}
        </div>

        {/* Users Menu Item */}
        <div className="menu-item" onClick={handleUsers}>
          <PeopleIcon />
          {navbar && <p className="menu-text">Users</p>}
        </div>

        {/* Companies Menu Item */}
        <div className="menu-item" onClick={handleCompanies}>
          <BusinessIcon />
          {navbar && <p className="menu-text">Companies</p>}
        </div>
      </div>
      

      
    </div>
  );
};

export default AdminMenubar;
