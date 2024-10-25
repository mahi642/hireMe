import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useParams } from "react-router-dom"; // Assuming you're passing a companyId or similar param
import { UserDetailsForCompanyService } from "../service/service"; // Adjust the import based on your actual service
import CompanyMenubar from "../components/CompanyMenubar"; // If you want to include a menubar
import "./useDetailsForCompany.css";

const UserDetailsForCompany = () => {
  const { companyId } = useParams(); // Assuming companyId is being passed in the route
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch data
  const fetchData = async () => {
    const result = await UserDetailsForCompanyService();
    if (result) {
      setUsers(result.users); // Adjust this based on your actual API response structure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="user-details-for-company">
      <div
        style={{
          display: "flex",
        }}
      >
        <CompanyMenubar />
        <div
          style={{
            padding: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "3rem",
              border: "1px solid white",
            }}
          >
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Experience</TableCell>
                      <TableCell>Skills</TableCell>
                      <TableCell>Resume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.name || "N/A"}</TableCell>
                          <TableCell>{user.email || "N/A"}</TableCell>
                          <TableCell>{user.location || "N/A"}</TableCell>
                          <TableCell>{user.experience} years</TableCell>
                          <TableCell>
                            {Array.isArray(user.skills)
                              ? user.skills.join(", ")
                              : "No skills listed"}
                          </TableCell>
                          <TableCell style ={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                          }}>
                            <img  width="30px" height="30px" src="/resume.png" alt="resume" />
                            {user.resume ? (
                              <a
                                href={user.resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Resume
                              </a>
                            ) : (
                              "No Resume"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForCompany;
