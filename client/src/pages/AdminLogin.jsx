
import React, { useState } from "react";
import { Grid } from "@mui/joy";
import {adminLoginService} from "../service/service";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLoginService(email, password);
      console.log("Login success:", response);
      localStorage.setItem("auth-token",response.token);
      navigate("/admin/dashboard")
    } catch (error) {
      console.error("Login failed:", error); // Log the error to see what went wrong
    }
  };


  return (
    <div
      className="admin-login"
      style={{
        color: "white",
      }}
    >
      <Grid container spacing={2}>
        {/* Left side - Image */}
        <Grid item xs={12} md={6}>
          <div className="admin-login-image">
            <img src="/image.png" alt="Admin Login" className="login-image" />
          </div>
        </Grid>

        {/* Right side - Login form */}
        <Grid item xs={12} md={6}>
          <div className="admin-login-form">
            <form onSubmit={handleSubmit}>
              <div className="admin-form-input">
                <label>Email Id</label>
                <input
                  placeholder="Enter the email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  style={{
                    color: "white",
                  }}
                />
              </div>

              <div className="admin-form-input">
                <label>Password</label>
                <input
                  placeholder="Enter the password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  style={{
                    color: "white",
                  }}
                />
              </div>

              <button
                type="submit"
                className="login-btn"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLogin;
