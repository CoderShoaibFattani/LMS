import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import image from "../assets/signup.jpg";
import logo from "../assets/j3.png";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationFor, setRegistrationFor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        alert("signed up successfully");
        const uid = userCredential.user.uid;
        try {
          await setDoc(doc(db, "users", uid), {
            firstName,
            lastName,
            email,
            registrationFor,
          });
        } catch (error) {
          console.error("Error setting document: ", error);
        }
        navigate("/login");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setRegistrationFor("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper elevation={24} sx={{ margin: "10px", padding: "10px" }}>
      <Grid container spacing={3}>
        <Grid
          item
          lg={6}
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="J3 Logo" width="40%" height={100} />
          <br /> <br />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "3rem",
              fontWeight: "700",
              textDecoration: "underline",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Welcome to Learning Management System
          </Typography>
          <img src={image} alt="Learning Management System" width="90%" />
        </Grid>
        <Grid item lg={6} xs={12} md={6} sx={{ padding: "10px" }}>
          <Typography
            variant="h3"
            component="p"
            sx={{
              fontSize: "2rem",
              fontWeight: "700",
              textDecoration: "underline",
              textTransform: "uppercase",
              textAlign: "center",
              mb: "30px",
            }}
          >
            Sign Up Form
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
              <InputLabel sx={{ mb: "10px" }}>Registration For</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={registrationFor}
                  onChange={(e) => setRegistrationFor(e.target.value)}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb="25px">
              <InputLabel sx={{ mb: "10px" }}>Password</InputLabel>
              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb="25px">
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "20px", left: "40%" }}
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </form>
          <Box>
            <Typography
              variant="p"
              component="p"
              mb="25px"
              sx={{ fontSize: "20px", textAlign: "center" }}
            >
              Already Have Account Click Below
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "20px", left: "40%" }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignUp;
