import React from "react";
import "./Navbar.css";
import Button from "@mui/joy/Button";


function Navbar() {
  return (
    <div className="navbar">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={"/hireMe_logo.png"}
            height="50px"
            alt="logo"
            style={{
              // mixBlendMode: "multiply", // Remove or comment this line
              borderRadius: "0.5rem",
              boxShadow: "0px 10px 2px rgba(0, 0, 0, 0.8)",
              padding: "1px",
              opacity: 1, // Set to 1 for full visibility
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            color="neutral"
            disabled={false}
            loading={false}
            onClick={function () {}}
            variant="solid"
            style={{
              backgroundColor: "black",
              margin: "0.25rem",
            }}
          >
            Hire Jobs
          </Button>

          <Button
            color="neutral"
            disabled={false}
            loading={false}
            onClick={function () {}}
            variant="solid"
            style={{
              backgroundColor: "black",
              margin: "0.25rem",
            }}
          >
            Find Jobs
          </Button>
          <Button
            color="neutral"
            disabled={false}
            loading={false}
            onClick={function () {}}
            variant="solid"
            style={{
              backgroundColor: "black",
              margin: "0.25rem",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
