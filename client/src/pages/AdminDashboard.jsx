import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { People, Business, Work } from "@mui/icons-material";
import AdminMenubar from "../components/AdminMenubar";
import { useNavigate } from "react-router-dom";

const GET_DASHBOARD_STATS = gql`
  query {
    userCount
    companyCount
    jobCount
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleCompanies = () => {
    navigate("/admin/companies");
  };
  const handleUsers = () => {
    navigate("/admin/users");
  };
  const handleJobs = ()=>{
    navigate("/admin/jobs");

  }


  const { loading, error, data } = useQuery(GET_DASHBOARD_STATS);

  if (loading) return <Typography color="textSecondary">Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <AdminMenubar />
      <div
        style={{
          width: "100%",
        }}
      >
        <div style={{ width: "100%", padding: "2rem" }}>
          <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Box
            sx={{
              minHeight: "100vh",
              padding: "2rem",
              color: "white",
              width: "100%",
              borderRadius: "1rem",
              backgroundColor: "#121212",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                width: "100%",
              }}
            >
              {/* Users Card */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Off-white color
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent>
                    <People sx={{ fontSize: 40, color: "#BB86FC" }} />
                    <div
                      style={{
                        fontSize: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom mr={2}>
                        Total Users
                      </Typography>
                      <Typography variant="h5">{data.userCount}</Typography>
                    </div>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, backgroundColor: "#992244" }}
                      onClick={handleUsers}
                    >
                      Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Companies Card */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Off-white color
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent>
                    <Business sx={{ fontSize: 40, color: "#03DAC6" }} />
                    <div
                      style={{
                        fontSize: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom mr={2}>
                        Total Companies
                      </Typography>
                      <Typography variant="h5">{data.companyCount}</Typography>
                    </div>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, backgroundColor: "#992244" }}
                      onClick={handleCompanies}
                    >
                      Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Jobs Card */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Off-white color
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent>
                    <Work sx={{ fontSize: 40, color: "#FF0266" }} />
                    <div
                      style={{
                        fontSize: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom mr={2}>
                        Total Jobs
                      </Typography>
                      <Typography variant="h5">{data.jobCount}</Typography>
                    </div>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, backgroundColor: "#992244" }}
                      onClick = {handleJobs}
                    >
                      Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
