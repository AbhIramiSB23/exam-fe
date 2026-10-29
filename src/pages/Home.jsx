
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDetails } from "../Services/allAPI";


const Home = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
  });

  const updatedStudent = (e) => {
    setStudents({ ...students, [e.target.name]: e.target.value });
  };

 const onClickSubmit = async (e) => {
  try {
    const apiResponse = await addDetails(students);

    if (apiResponse.status === 200 ) {
      toast.success("Course added successfully");
      navigate("/student-details");
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (

    
    <Container maxWidth="sm">
        <Typography variant="h5" textAlign="center" mb={3} mt={7} >
          STUDENT MANAGEMENT
        </Typography>

      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        

        <Typography variant="h5" textAlign="center" mb={3}>
          Student Form
        </Typography>


    

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={students.name}
          onChange={updatedStudent}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={students.email}
          onChange={updatedStudent}
        />

        <TextField
          label="Course"
          name="course"
          fullWidth
          margin="normal"
          value={students.course}
          onChange={updatedStudent}
        />

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          fullWidth
          margin="normal"
          value={students.phone}
          onChange={updatedStudent}
        />

        <Button 
          onClick={()=>navigate('/student-details')}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
