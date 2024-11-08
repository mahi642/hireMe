import React, { useEffect, useState } from "react";
import "./CompanyHome.css";
import { Button, Grid, Box } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import CompanyMenubar from "../components/CompanyMenubar";
import { useNavigate } from "react-router-dom";
const CompanyHome = () => {
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style ={{
      display:"flex"
    }}>
      <CompanyMenubar/>
      <div className="company-home" style ={{
        width:"80%"
      }}>
        <div className={`company-heading ${isVisible ? "visible" : ""}`}>
          <p className="company-heading-text">‘You bring the oppurtunity’</p>
          <p className="company-heading-text">‘we bring the best talent’</p>
        </div>

        <div className="company-home-buttons">
          <Button
            className="company-post-job-btn"
            startDecorator={<Add />}
            onClick={() => navigate("/postjob")}
          >
            Post a Job
          </Button>
        </div>

        <Grid container spacing={1} m={5}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flex={7} mb={{ xs: 2, md: 0 }}>
                <img
                  className="company-image animate-img"
                  src="/comapny1.png"
                  alt="Company hiring"
                  style={{ width: "60%" }}
                />
              </Box>
              <Box flex={5}>
                <p className="company-text animate-text">
                  Reach out to top professionals who match your company’s
                  requirements. Build a team that drives growth and success for
                  your organization.
                </p>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flex={5} order={{ xs: 2, md: 1 }}>
                <p className="company-text animate-text">
                  Manage job posts and view candidate profiles with ease. Find
                  the ideal fit for each position.
                </p>
              </Box>
              <Box
                flex={7}
                order={{ xs: 1, md: 1 }}
                mb={{ xs: 2, md: 0 }}
                sx={{
                  marginLeft: "2rem",
                }}
              >
                <img
                  className="company-image animate-img"
                  src="/company2.png"
                  alt="Candidate search"
                  style={{ width: "80%" }}
                  height={"50%"}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompanyHome;
