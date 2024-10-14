
import React from "react";
import { Button, Grid } from "@mui/joy";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import WifiCalling3TwoToneIcon from "@mui/icons-material/WifiCalling3TwoTone";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <hr
          style={{
            width: "100%",
            height: "0.5px",
            backgroundColor: "grey",
            margin: "3rem 0",
          }}
        />
        <Grid container spacing={2}>
          {/* Subscribe Section - Left side on large screens */}
          <Grid item xs={12} md={4} className="footer-subscribe">
            <p className="footer-text">Subscribe for latest news!</p>
            <div>
              <input
                className="footer-email"
                type="text"
                placeholder="Enter your email"
              />
              <Button
                sx={{
                  backgroundColor: "#994523",
                  padding: "0.85rem",
                  borderRadius: "0px 10px 10px 0px",
                }}
              >
                Submit
              </Button>
            </div>
          </Grid>

          {/* Contact and Follow Us Section - Right side on large screens */}
          <Grid item xs={12} md={8}>
            <Grid spacing={2}>
              <Grid item xs={12} md={6} className="footer1">
                <p >Contact Us</p>
                <div className="footer-details">
                  <LocationOnTwoToneIcon
                    sx={{ fontSize: 30, marginRight: 0.5 }}
                  />
                  <p>Bengaluru</p>
                </div>
                <div className="footer-details">
                  <EmailTwoToneIcon sx={{ fontSize: 30, marginRight: 0.5 }} />
                  <p>hireme@gmail.com</p>
                </div>
                <div className="footer-details">
                  <WifiCalling3TwoToneIcon sx={{ marginRight: 0.5 }} />
                  <p>9550696515</p>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  marginTop: 3,
                }}
                className="footer1"
              >
                <p>Follow Us</p>
                <div className="footer-social-icons">
                  <FacebookTwoToneIcon sx={{ marginRight: 5, marginLeft: 7 }} />
                  <InstagramIcon sx={{ marginRight: 5 }} />
                  <TelegramIcon sx={{ marginRight: 5 }} />
                  <TwitterIcon sx={{ marginRight: 5 }} />
                  <LinkedInIcon sx={{ marginRight: 5 }} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <hr
          style={{
            width: "96%",
            height: "1px",
            backgroundColor: "#fff",
            border: "none",
            margin: "0 auto", // This centers the line
          }}
        />

        <p
          style={{
            color: "white",
            textAlign: "center",
            margin: "1rem",
            fontSize: "14px",
          }}
        >
          © 2024 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
