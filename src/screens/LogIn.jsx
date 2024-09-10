import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

import image from "../assets/signup.jpg";
import logo from "../assets/j3.png";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential.user);
        localStorage.setItem("userId", userCredential.user.uid);
        const getData = await getDoc(doc(db, "users", userCredential.user.uid));
        localStorage.setItem("userData", JSON.stringify(getData.data()));
        const users = getData.data();
        users.registrationFor === "Teacher"
          ? navigate("/dashboard/Teachers-List")
          : navigate("/dashboard/Students-List");
        setEmail("");
        setPassword("");
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user);
        localStorage.setItem("userId", result.user.uid);
        const getData = await getDoc(doc(db, "users", result.user.uid));
        localStorage.setItem("userData", JSON.stringify(getData.data()));
        const users = getData.data();
        users.registrationFor === "Teacher"
          ? navigate("/dashboard/Teachers-List")
          : navigate("/dashboard/Students-List");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
            Log In Form
          </Typography>
          <form onSubmit={handleSubmit}>
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
                Login
              </Button>
            </Box>
          </form>
          <Box mb="25px">
            <Typography
              variant="p"
              component="p"
              sx={{ mb: "25px", textAlign: "center" }}
            >
              or Sign in Using
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "20px", left: "35%" }}
              onClick={handleGoogleSignin}
            >
              <GoogleIcon />
              <span style={{ marginLeft: "20px" }}> Google </span>
            </Button>
          </Box>
          <Box>
            <Typography
              variant="p"
              component="p"
              mb="25px"
              sx={{ fontSize: "20px", textAlign: "center" }}
            >
              New To Website Click Below
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "20px", left: "40%" }}
              onClick={() => navigate("/")}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LogIn;
