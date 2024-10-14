import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { Button, Grid, Box } from "@mui/joy";
import Add from "@mui/icons-material/Add";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set to true after component mounts to trigger text animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homepage">
      <div className={`homeheading ${isVisible ? "visible" : ""}`}>
        <p className="heading-text">&#39;Your Next Opportunity Awaits&#39;</p>
        <p className="heading-text">
          &#39;Post Jobs and Find the Perfect Hire&#39;
        </p>
      </div>

      <div className="home-buttons">
        <Button
          style={{
            padding: "0.5rem 2rem",
            margin: "6px",
          }}
          startDecorator={<Add />}
        >
          Post a Job
        </Button>
        <Button
          style={{
            padding: "0.5rem 2rem",
            margin: "6px",
          }}
          endDecorator={<KeyboardArrowRight />}
          color="success"
        >
          Find Jobs
        </Button>
      </div>
      <Grid container spacing={2} m={7}>
        {/* Section 1: Job Seekers */}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex={7} mb={{ xs: 2, md: 0 }}>
              <img
                className="hiremepng animate-img"
                src="/hireme1.png"
                alt="job seek"
                style={{ width: "60%" }}
              />
            </Box>
            <Box flex={5}>
              <p className="hiretext animate-text">
                Discover job opportunities that match your skills. Whether
                you're seeking a new challenge, a career change, or your first
                role, we've got you covered. Join us and take the next step in
                your career.
              </p>
            </Box>
          </Box>
        </Grid>

        {/* Section 2: Employers */}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box flex={5} order={{ xs: 2, md: 1 }}>
              <p className="hiretext animate-text">
                Looking to hire top talent for your organization? Post job
                listings and find the perfect candidates with the right skills
                to help grow your business. Our platform connects you with
                qualified professionals in various industries.
              </p>
            </Box>
            <Box flex={7} order={{ xs: 1, md: 2 }} mb={{ xs: 2, md: 0 }}>
              <img
                className="hiremepng animate-img"
                src="/hireme2.png"
                alt="job search"
                style={{ width: "80%" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
