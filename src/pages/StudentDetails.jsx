
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getDetails,
  deleteDetails,
  updateDetails
} from "../Services/allAPI";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [duplicateData, setDuplicateData] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState({
    id: "",
    name: "",
    email: "",
    course: "",
    phone: ""
  });

 

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const apiRes = await getDetails();

      if (apiRes.status === 200) {
        const data = apiRes.data.filter(
          (student) => student.name
        );

        setDuplicateData(data);
        setStudents(data);
      }
    } catch (error) {
      toast.error("Failed to load students");
    }
  };

  const onClickDelete = async (id) => {
    try {
      const res = await deleteDetails(id);

      if (res.status === 200 || res.status === 204) {
        toast.success("Student deleted successfully");
        await getStudents();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const onEditClick = (student) => {
    setSelectedStudents({ ...student });
   
  };

  const onUpdateClick = async () => {
    try {
      const res = await updateDetails(
        selectedStudents.id,
        selectedStudents
      );

      if (res.status === 200) {
        toast.success("Student updated successfully");
        setOpen(false);
        await getStudents();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <>
      {open && (
        <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 3,
            p: 3,
            boxShadow: 3,
            borderRadius: 2
          }}
        >
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={selectedStudents.name}
            onChange={(e) =>
              setSelectedStudents({
                ...selectedStudents,
                [e.target.name]: e.target.value
              })
            }
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={selectedStudents.email}
            onChange={(e) =>
              setSelectedStudents({
                ...selectedStudents,
                [e.target.name]: e.target.value
              })
            }
          />

          <TextField
            label="Course"
            name="course"
            fullWidth
            margin="normal"
            value={selectedStudents.course}
            onChange={(e) =>
              setSelectedStudents({
                ...selectedStudents,
                [e.target.name]: e.target.value
              })
            }
          />

          <TextField
            label="Phone"
            name="phone"
            type="tel"
            fullWidth
            margin="normal"
            value={selectedStudents.phone}
            onChange={(e) =>
              setSelectedStudents({
                ...selectedStudents,
                [e.target.name]: e.target.value
              })
            }
          />

          <Button
            variant="contained"
            onClick={onUpdateClick}
            sx={{ mt: 2, mr: 1 }}
          >
            Update
          </Button>

          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.phone}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => onEditClick(student)}
                    variant="contained"
                    size="small"
                  >
                    Edit
                  </Button>{" "}

                  <Button
                    onClick={() => onClickDelete(student.id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentDetails;
