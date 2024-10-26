import React, { useState, useEffect } from "react";
import { getTotalCostService } from "../service/service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import CompanyMenubar from "../components/CompanyMenubar";

const TotalCostToJob = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination

  const fetchData = async () => {
    const result = await getTotalCostService();
    if (result) {
      setData(result);
      setLoading(false);
    } else {
      console.log("Error in getting data from service to component");
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
    setPage(0); // Reset to the first page when changing rows per page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <CompanyMenubar />
      <div style={{ padding: "2rem", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Total Cost for Jobs Details
        </Typography>
        <div style={{ width: "100%", border: "1px solid white" }}>
          <div style={{ padding: "1rem" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Role</TableCell>
                    <TableCell>Job Type</TableCell>
                    <TableCell align="center">Number of Openings</TableCell>
                    <TableCell align="right">Salary</TableCell>
                    <TableCell align="right">Total Salary for Job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.jobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job, index) => (
                      <TableRow key={index}>
                        <TableCell>{job.jobRole}</TableCell>
                        <TableCell>{job.jobType}</TableCell>
                        <TableCell align="center">
                          {job.numberOfOpenings}
                        </TableCell>
                        <TableCell align="right">{job.salary}</TableCell>
                        <TableCell align="right">
                          {job.totalSalaryForJob.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="right"
                      style={{ fontWeight: "bold" }}
                    >
                      Total Cost
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      {data.totalCost.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                component="div"
                count={data.jobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCostToJob;
