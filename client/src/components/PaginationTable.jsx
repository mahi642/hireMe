import React, { useState } from "react";
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

const PaginationTable = ({ users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  // Calculate the current rows to display
  const currentRows = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer
        sx={{
          maxHeight: "45f0px", // Set a fixed height
          overflow: "auto", // Enable vertical scrolling
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            background: "blue", // Color of the scrollbar track
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888", // Color of the scrollbar thumb
            borderRadius: "10px", // Round edges for the thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "blue", // Color of the thumb on hover
          },
          scrollbarWidth: "thin", // For Firefox: make the scrollbar thinner
          scrollbarColor: "#blue blue", // For Firefox: thumb color and track color
        }}
      >
        <Table sx={{ backgroundColor: "black", minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e38d3f" }}>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone Number</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Current Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((user, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>{user.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {user.phoneNumber}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{user.age}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.gender}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {user.currentPosition}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={users.length} // Total number of users
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#e38d3f" }}
      />
    </Paper>
  );
};

export default PaginationTable;
