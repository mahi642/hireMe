import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import UserSidebar from "../components/UserSideBar";
import { Grid, Box, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { getUserProfileDataService } from "../service/service";

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Default loading to true
  const [data, setData] = useState(null); // Default data to null

  const handleEdit = () => {
    navigate("/user/profile");
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await getUserProfileDataService();
      if (!response) {
        console.error("Error in fetching user profile data.");
      } else {
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!data) {
    return <div>Error: Unable to fetch data</div>; // Handle case where no data is returned
  }

  return (
    <div>
      <p
        style={{
          fontSize: 30,
          textAlign: "center",
          fontFamily: "Times",
          color: "rgb(250, 90, 110)",
        }}
      >
        User Profile
      </p>
      <div style={{ display: "flex", width: "100%" }}>
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
            <div>
              <div className="profile-input-feild">
                <p className="profile-input-label">Name</p>
                <div className="profile-input-value">{data.name || "N/A"}</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Email Address</p>
                <div className="profile-input-value">{data.email || "N/A"}</div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Education</p>
                <div className="profile-input-value">
                  {data.highestEducation || "N/A"}
                </div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Location</p>
                <div className="profile-input-value">
                  {data.location || "N/A"}
                </div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Experience</p>
                <div className="profile-input-value">
                  {data.experience ? `${data.experience} years` : "N/A"}
                </div>
              </div>

              <div className="profile-input-feild">
                <p className="profile-input-label">Uploaded Resume</p>
                <div  style ={{
                  textAlign:"justify",
                  

                }}className="profile-input-value">
                  {data.resume?.url || "No resume uploaded"}
                </div>
              </div>

              <div className="profile-input-feild">
                <p
                  style={{
                    textAlign: "justify",
                  }}
                  className="profile-input-label"
                >
                  Joined HireMe on
                </p>
                <div className="profile-input-value">
                  {data.createdAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(data.createdAt))
                    : "N/A"}
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <Box>
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
                {data.aboutYourself
                  ? data.aboutYourself.replace(/<\/?[^>]+(>|$)/g, "")
                  : "N/A"}
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
                {data.skills && data.skills.length > 0
                  ? data.skills.map((skill, index) => (
                      <p key={index} style={{ margin: "0.5rem",fontSize:"bold" }}>
                        {skill}
                      </p>
                    ))
                  : "No skills added"}
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>

      <div className="profile-button">
        <Button
          sx={{
            backgroundColor: "green",
            padding: "1rem 2rem",
          }}
          onClick={handleEdit}
        >
          Edit profile
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
