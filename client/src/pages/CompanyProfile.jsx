import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import "./CompanyProfile.css";
import CompanyMenubar from "../components/CompanyMenubar";
import { Grid } from "@mui/joy";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getCompanyDetailsService } from "../service/service";

const CompanyProfile = () => {
  const [data, setData] = useState(null); // Start with null for loading state

  const fetchData = async () => {
    try {
      const result = await getCompanyDetailsService();
      if (!result || !result.company) {
        alert("Error in getting profile data");
      } else {
        setData(result.company); // Set only the company data
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run on mount

  if (!data) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div style={{ display: "flex" }}>
      <CompanyMenubar />

      <div className="profile-main" style={{ width: "100%" }}>
        <Typography variant="h4" style={{ marginBottom: "1rem" }}>
          Company Profile
        </Typography>

        <Grid container spacing={3} className="profile-grid">
          {/* Left side - logo and name */}
          <Grid xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "aqua",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <img
                src={"/pic1.jpg"}
                width={150}
                alt="company-logo"
                style={{
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h6">{data.name}</Typography>
            </Paper>
          </Grid>

          {/* Right side - email, location, description */}
          <Grid xs={12} md={8} container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  margin: "0 1rem 1rem 0",
                }}
              >
                <EmailIcon sx={{ marginRight: "1rem", color: "#1976d2" }} />
                <Typography variant="body1">{data.email}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  margin: "0 1rem 1rem 0",
                }}
              >
                <LocationOnIcon
                  sx={{ marginRight: "1rem", color: "#1976d2" }}
                />
                <Typography variant="body1">{data.companyLocation}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  padding: "1.5rem",
                  margin: "0 1rem 1rem 0",
                  textAlign: "justify",
                }}
              >
                <p style={{ fontSize: "1.4rem", margin: "0.5rem 0" }}>
                  About the company
                </p>
                <Typography variant="body1" sx={{ fontFamily: "Times" }}>
                  {data.companyDescription}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid md={4} xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: "1.4rem",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-around",
              }}
            >
              <p style={{ fontSize: "1.4rem", margin: "1rem 0" }}>
                Number of employees
              </p>
              <p style={{ fontSize: "1.3rem", margin: "1rem 0" }}>
                {data.numberOfEmployees}
              </p>
            </Paper>
          </Grid>

          <Grid md={8} xs={12}>
            <Paper sx={{ padding: "0.5rem" }}>
              <p style={{ fontSize: "1.4rem", marginBottom: "0.1rem" }}>
                Facilities at the company
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {data.facilitiesProvided &&
                  data.facilitiesProvided.map((facility, index) => (
                    <span
                      style={{
                        backgroundColor: "grey",
                        margin: "0.8rem 0.5rem",
                        padding: "0.4rem 1rem",
                        borderRadius: "0.5rem",
                      }}
                      key={index}
                    >
                      {facility}
                      {index < data.facilitiesProvided.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </p>
            </Paper>
          </Grid>

          {/* Additional Info */}
          <Grid xs={12} md={4}>
            <Paper sx={{ borderRadius: "1rem" }}>
              <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
                Work start time
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                  backgroundColor: "grey",
                  margin: "0.5rem 0",
                }}
              >
                {data.workStartTime}
              </p>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ borderRadius: "1rem" }}>
              <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
                Work End time
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                  backgroundColor: "grey",
                  margin: "0.5rem 0",
                }}
              >
                {data.workEndTime}
              </p>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ borderRadius: "1rem" }}>
              <p style={{ fontSize: "1.4rem", textAlign: "center" }}>
                Work culture
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                  backgroundColor: "grey",
                  margin: "0.5rem 0",
                }}
              >
                {data.workCulture}
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompanyProfile;
