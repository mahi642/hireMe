import React, { useState } from "react";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { userLoginService } from "../service/service";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle navigation to registration page
  const handleRegister = () => {
    navigate("/register");
  };

  // Google login success handler
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // Handle Google login success
      // You can dispatch to your local state or manage it here
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLogin = async () => {
    try {
      const response = await userLoginService(email, password);

      if (response.success) {
        // Handle successful login
        console.log("Login successful:", response);
        console.log("token for auth",response.token);
        
        localStorage.setItem("auth-token",response.token);

        if(response.user.role ==="user"){
          navigate("/jobsearch")
        }
        else if(response.user.role==="company"){
          navigate("/company/home")
        }
        // Redirect or perform other actions as needed
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login1">
      <div className="login-left"></div>

      <div className="login-right">
        <p className="login-text">Login to your account</p>

        <div className="login-inputs">
          <p>Email</p>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-inputs">
          <p>Password</p>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <p onClick={handleRegister}>Don't have an account? Click here!</p>

        <Button
          sx={{
            backgroundColor: "#4889f4",
            padding: "0.5rem 2.5rem",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <div>
          Or
          <hr />
        </div>

        <div>
          <Button
            onClick={() => login()}
            sx={{
              backgroundColor: "#4889f4",
              padding: "0.5rem 1rem",
              color: "#fff",
            }}
          >
            <FcGoogle
              style={{
                marginRight: "9px",
                fontSize: "1.5rem",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
