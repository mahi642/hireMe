import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import AdminMenubar from "../components/AdminMenubar";
import { getUsersForAdminService } from "../service/service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getUsersForAdminService();
      if (response ) {
        setData(response);
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminMenubar />
      <div
        className="user-details-container"
        style={{ width: "100%", padding: "0.2rem" }}
      >
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              border: "1px solid white",
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <Paper elevation={3} style={{ width: "100%", padding: "5px" }}>
              <TableContainer
                style={{
                  maxHeight: "400px", // Set a maximum height for scrolling
                  overflow: "auto",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Number of Jobs Applied</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Experience</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Location</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Highest Education</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <TableRow key={user._id || user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.jobs?.length || 0}</TableCell>
                          <TableCell>{user.experience}</TableCell>
                          <TableCell>{user.location}</TableCell>
                          <TableCell>{user.highestEducation}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
