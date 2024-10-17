import React from "react";
import "./UserProfile.css";
import UserSidebar from "../components/UserSideBar";
import { Grid, Box, Button } from "@mui/joy";

const UserProfile = () => {
  return (
    <div>
      <p
        style={{
          fontSize: 30,
          textAlign: "center",
          fontFamily: "Times",
          color: "rgb(160, 250, 256)",
        }}
      >
        User Profile
      </p>
      <div style={{ display: "flex", width: "100%" }}>
        {/* Left Sidebar with User Details */}
        <UserSidebar />

        <Grid
          container
          justifyContent="center"
          className="profile-page"
          spacing={2}
          sx={{ flex: 1 }}
        >
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 2,
              borderRadius: "1rem",
            }}
          >
            <div style={{}}>
              <div className="profile-input-feild">
                <p className="profile-input-label">User Name</p>
                <div className="profile-input-value">Mahesh Balabadra</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Email Address</p>
                <div className="profile-input-value">
                  maheshbalabdra186@gmial.com
                </div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Education</p>
                <div className="profile-input-value">
                  Bachelors of Technology
                </div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Location</p>
                <div className="profile-input-value">Chennai, India</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Experience</p>
                <div className="profile-input-value">3 years</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Uploaded Resume</p>
                <div className="profile-input-value">resume.pdf</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Joined HireMe on</p>
                <div className="profile-input-value">21 December 2024</div>
              </div>
            </div>
          </Grid>

          {/* Profile Image Section */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <Box sx={{}}>
              <img
                src="/profile.svg"
                alt="Profile"
                style={{ height: "100%", width: "100%", borderRadius: "50%" }}
              />
            </Box>
            <Box
              sx={{
                border: "1px solid white",
                padding: "1rem",
                margin: "1rem",
              }}
            >
              <p
                className="profile-input-label"
                style={{
                  textAlign: "center",
                }}
              >
                About Me
              </p>
              <div
                style={{
                  backgroundColor: "rgb(183,175,175)",
                  fontFamily: "Times",
                  color: "rgb(85, 21, 21)",
                  borderRadius: "0.5rem",
                  padding: "0.4rem",
                }}
              >
                I am a passionate and results-driven full-stack developer with
                over 4 years of experience in building web applications. My
                expertise lies in JavaScript, particularly in React, Node.js,
                and MongoDB, where I have delivered scalable, user-friendly
                solutions for various clients.
              </div>
            </Box>
            <Box
              sx={{
                border: "1px solid white",
                padding: "1rem",
                margin: "1rem",
              }}
            >
              <p
                className="profile-input-label"
                style={{
                  textAlign: "center",
                }}
              >
                Skills
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
                className="skill-profile"
              >
                <p>Cpp</p>
                <p>React</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>Cpp</p>
                <p>React</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>

      <div className="profile-button">

      <Button sx = {{
        backgroundColor:"green",
        padding:"1rem 2rem",
      
      }} >Edit profile</Button>

      </div>
    </div>
  );
};

export default UserProfile;
