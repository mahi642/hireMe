import React, { useState } from "react";
import { Button, Checkbox } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { userRegisterService } from "../service/service";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // Individual state for user attributes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Assuming you may allow setting this after the login
  const [name, setName] = useState("");
  const [role, setRole] = useState("find"); // Default to "find"
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  // Handle navigation to login page
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle role selection
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  // Google login success handler
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // Set the role when the login succeeds
      setRole(role);
      setIsGoogleSignup(true);

      // Use access token to fetch user profile
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const profile = res.data;
          // Set the Google profile attributes to the individual state variables
          setEmail(profile.email);
          setName(profile.name);
          console.log("Profile Data: ", profile);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // Google logout handler
  const logOut = () => {
    googleLogout();
    setEmail("");
    setName("");
    setPassword(""); // Reset states on logout
    setRole("find");
  };

  // Handle registration form submission
  const handleRegister = async () => {
    try {
      let userData;

      if (isGoogleSignup) {
        // If the user signed up with Google, send their Google profile data
        userData = {
          name, // From Google profile
          email, // From Google profile
          password: "", // You can choose to generate a random password or leave it empty if using OAuth
          role, // From state
          // isGoogleSignup: true, // Optionally mark this user as registered via Google
        };
      } else {
        // If the user signed up using the form
        userData = {
          name, // From form
          email, // From form
          password, // From form
          role, // From state
          // isGoogleSignup: false, // Mark this user as a regular registration
        };
      }

      console.log("Registering User Data:", userData);

      const response = await userRegisterService(email,password,name,role); // Send to backend
      console.log("Registration response: ", response);

      // Navigate or handle successful registration
      if (response) {
        
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left"></div>

      <div className="register-right">
        <p className="register-text">Create your account</p>
        <div className="register-checkbox">
          <Checkbox
            checked={role === "company"}
            onChange={() => handleRoleChange("company")}
            sx={{ marginRight: "1rem" }}
            label="Hire a role"
          />
          <Checkbox
            checked={role === "user"}
            onChange={() => handleRoleChange("user")}
            label="Find a job"
          />
        </div>

        <div className="register-inputs">
          <p
            style={{
              textAlign: "justify",
              marginLeft: "8rem",
              marginBottom: "0.5rem",
            }}
          >
            Full Name
          </p>
          <input
            className="register-input"
            type="text"
            value={name}
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="register-inputs">
          <p
            style={{
              textAlign: "justify",
              marginLeft: "8rem",
              marginBottom: "0.5rem",
            }}
          >
            Email
          </p>
          <input
            className="register-input"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        {!isGoogleSignup && ( // Only show password input if not Google Signup
          <div className="register-inputs">
            <p
              style={{
                textAlign: "justify",
                marginLeft: "8rem",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </p>
            <input
              className="register-input"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <p
          style={{ textDecoration: "underline", margin: "1rem" }}
          onClick={handleLogin}
        >
          Already have an account? Click here!
        </p>

        <Button
          onClick={handleRegister} // Trigger registration
          sx={{
            backgroundColor: "#4889f4",
            padding: "0.5rem 2.5rem",
          }}
        >
          Create
        </Button>

        <div
          style={{
            margin: "0.5rem",
          }}
        >
          Or
          <hr
            style={{
              width: "90%",
              height: "0.5px",
              backgroundColor: "grey",
              margin: "0 auto",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "1rem",
          }}
        >
          {/* Google Login Button */}
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
            Register with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
