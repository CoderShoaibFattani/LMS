import { Box, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const FeeSubmision = () => {
  const [name, setName] = useState("");
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchingData();
  });

  const fetchingData = async () => {
    const querrySnapshot = await getDocs(collection(db, "fees"));
    const feeData = querrySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFees(feeData);
  };

  return (
    <Paper elevation={24} sx={{ width: "70%", margin: "20px auto" }}>
      <Box sx={{ my: "20px" }}>
        <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
          Payment For
        </Typography>
        <form>
          <Box sx={{ margin: "20px 0px", padding: "20px" }}>
            <InputLabel>Student Name</InputLabel>
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default FeeSubmision;
