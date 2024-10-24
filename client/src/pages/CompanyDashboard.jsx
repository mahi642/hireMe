import React from "react";
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid } from "@mui/joy";
import { Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Navigate, useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";


const CompanyDashboard = () => {
  const navigate = useNavigate();

  const handleActiveJobs = () => {
    navigate("/company/currentjobs");
  };
  const handlePreviousJobs =()=>{
    navigate("/company/previousjobs");
  }
  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />
      <div style={{ padding: "2rem", width: "80%" }}>
        <h1 style={{ marginBottom: "2rem" }}>Company Dashboard</h1>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "1rem",
            padding: "1.5rem",
          }}
        >
          <Grid container spacing={1}>
            {/* Total Users */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <GroupIcon
                    sx={{ fontSize: "2.5rem", color: "#1976d2", mb: "0.5rem",borderRadius:"50%" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Total Users
                    </Typography>
                    <Typography variant="h6">1,200</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>

            {/* Total Jobs Posted */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <WorkOutlineIcon
                    sx={{ fontSize: "3rem", color: "#1976d2", mb: "0.5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Total Jobs Posted
                    </Typography>
                    <Typography variant="h6">245</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>

            {/* Active Jobs */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: "3rem", color: "#1976d2", mb: "0.5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Active Jobs
                    </Typography>
                    <Typography variant="h6">98</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                    onClick={handleActiveJobs}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>

            {/* Expired Jobs */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <HourglassEmptyIcon
                    sx={{ fontSize: "3rem", color: "#1976d2", mb: "0.5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Expired Jobs
                    </Typography>
                    <Typography variant="h6">30</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}

                    onClick = {handlePreviousJobs}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>

            {/* Total Applications */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AssignmentTurnedInIcon
                    sx={{ fontSize: "3rem", color: "#1976d2", mb: "0.5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Total Applications
                    </Typography>
                    <Typography variant="h6">1,820</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>

            {/* Shortlisted */}
            <Grid xs={12} md={4}>
              <Paper
                sx={{
                  padding: "2rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon
                    sx={{ fontSize: "3rem", color: "#1976d2", mb: "0.5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "#333",
                      }}
                    >
                      Shortlisted
                    </Typography>
                    <Typography variant="h6">75</Typography>
                  </div>
                  <button
                    style={{
                      backgroundColor: "black",
                      padding: "0.7rem 2rem",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
