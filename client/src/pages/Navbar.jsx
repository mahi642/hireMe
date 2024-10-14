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
          <h1>HireMe</h1>
          <p>logo</p>
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
