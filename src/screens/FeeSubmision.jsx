import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const FeeSubmision = () => {
  const [name, setName] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [yearlyFee, setYearlyFee] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const showData = () => {
    const stringData = localStorage.getItem("feesData");
    if (stringData) {
      const data = JSON.parse(stringData);
      setStdClass(data.stdClass);
      setMonthlyFee(data.monthlyFee);
      setYearlyFee(data.yearlyFee);
    }
  };

  useEffect(() => {
    showData();
  });

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const feeInfo = {
        name,
        stdClass,
        monthlyFee,
        yearlyFee,
        paymentMethod,
      };
      const id = name + stdClass + paymentMethod;
      await setDoc(doc(db, "feeInfo", id), feeInfo);
      localStorage.setItem("stdID", id);
      localStorage.setItem("feeInfo", JSON.stringify(feeInfo));
      navigate("/dashboard/Fee-Voucher");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper elevation={24} sx={{ width: "70%", margin: "20px auto" }}>
      <Box sx={{ my: "20px" }}>
        <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
          Payment For
        </Typography>
        <form>
          <Box sx={{ margin: "0px 0px 15px", padding: "0px 20px" }}>
            <InputLabel>Student Name</InputLabel>
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ margin: "0px 0px 15px", padding: "0px 20px" }}>
            <InputLabel>Student Class</InputLabel>
            <TextField type="text" value={stdClass} fullWidth />
          </Box>
          <Box sx={{ margin: "0px 0px 15px", padding: "0px 20px" }}>
            <InputLabel>Monthly Fee</InputLabel>
            <TextField type="text" value={monthlyFee} fullWidth />
          </Box>
          <Box sx={{ margin: "0px 0px 15px", padding: "0px 20px" }}>
            <InputLabel>Yearly Fee</InputLabel>
            <TextField type="text" value={yearlyFee} fullWidth />
          </Box>
          <Box sx={{ margin: "0px 0px 15px", padding: "0px 20px" }}>
            <InputLabel>Payment Method</InputLabel>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="EasyPaisa">EasyPaisa</MenuItem>
                <MenuItem value="JazzCash">JazzCash</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              margin: "0px 0px 15px",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Generate Fee Voucher
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default FeeSubmision;
