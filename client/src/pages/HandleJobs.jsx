import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import AdminMenubar from "../components/AdminMenubar";

const GET_JOBS = gql`
  query {
    jobs {
      id
      title
      company
      salary
      location
      createdAt
    }
  }
`;

const HandleJobs = () => {
  const { loading, error, data } = useQuery(GET_JOBS);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <AdminMenubar />
      <div
        style={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <p style={{
          fontSize: "2rem",
          fontWeight: "bold",

        }}>Job details</p>
        <div
          style={{
            padding: "1rem",
            border: "1px solid white",
            borderRadius: "1rem",
          }}
        >
          <Paper
            sx={{
              borderRadius: "1rem",
            }}
          >
            <TableContainer
              style={{
                maxHeight: "400px", // Set a maximum height for scrolling
                overflow: "auto",
                
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Posted On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.jobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          {new Date(job.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.jobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default HandleJobs;
