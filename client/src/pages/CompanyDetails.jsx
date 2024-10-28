import React, { useEffect, useState } from "react";

import AdminMenubar from "../components/AdminMenubar";
import { getCompaniesForAdminService } from "../service/service";
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

const CompanyDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const response = await getCompaniesForAdminService();
    if (!response) {
      console.error("Error in getting companies for admin from the service.");
    } else {
      setData(response);
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
        className="company-details-container"
        style={{ width: "100%", padding: "0.2rem" }}
      >
        <Typography variant="h5" gutterBottom>
          Company Details
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
              padding: "2rem",
            }}
          >
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
                          <strong>Company Name</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Location</strong>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "start",
                          }}
                        >
                          <strong>Created on</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Number of Jobs Posted</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((company) => (
                          <TableRow key={company.id}>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.location}</TableCell>
                            <TableCell>
                              {new Date(company.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </TableCell>
                            <TableCell>{company.jobs.length}</TableCell>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
