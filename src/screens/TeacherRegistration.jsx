import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const TeacherRegistration = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "teachers"), {
        firstName,
        lastName,
        email,
        education,
        gender,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <Box width="50%" margin="20px auto">
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
          mb: "30px",
        }}
      >
        Teacher Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>First Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Last Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Email</InputLabel>
          <TextField
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Education</InputLabel>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <MenuItem value="Matric">Matric</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Graduate">Graduate</MenuItem>
              <MenuItem value="Post Graduate">Post Graduate</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Gender</InputLabel>
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </Box>
        <Box mb="25px">
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontSize: "20px", left: "40%" }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TeacherRegistration;
