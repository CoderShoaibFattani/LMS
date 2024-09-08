import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const SingleCard = ({ stdClass, monthlyFee, yearlyFee }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await addDoc(collection(db, "fees"), {
        stdClass,
        monthlyFee,
        yearlyFee,
      });
      navigate("/dashboard/Fee-Submission");
    } catch (error) {
      console.error("Error setting document: ", error);
    }
  };
  return (
    <Card sx={{ width: "60%", margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h6" component="h1" textAlign="center">
          Fee Voucher - Class {stdClass}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Class</Typography>
          <Typography>{stdClass}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Monthly Fee</Typography>
          <Typography>{monthlyFee}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Yearly Fee</Typography>
          <Typography>{yearlyFee}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mb: "20px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClick}
          >
            Pay Now
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

SingleCard.propTypes = {
  stdClass: propTypes.string.isRequired,
  monthlyFee: propTypes.number.isRequired,
  yearlyFee: propTypes.number.isRequired,
};

const FeeVoucher = () => {
  const feeStructure = [
    { class: "I", MonthlyFee: 500, YearlyFee: 6000 },
    { class: "II", MonthlyFee: 600, YearlyFee: 7200 },
    { class: "III", MonthlyFee: 700, YearlyFee: 8400 },
    { class: "IV", MonthlyFee: 800, YearlyFee: 9600 },
    { class: "V", MonthlyFee: 900, YearlyFee: 10800 },
    { class: "VI", MonthlyFee: 1000, YearlyFee: 12000 },
    { class: "VII", MonthlyFee: 1100, YearlyFee: 13200 },
    { class: "VIII", MonthlyFee: 1200, YearlyFee: 14400 },
    { class: "IX", MonthlyFee: 1300, YearlyFee: 15600 },
    { class: "X", MonthlyFee: 1400, YearlyFee: 16800 },
    { class: "XI", MonthlyFee: 1500, YearlyFee: 18000 },
    { class: "XII", MonthlyFee: 1600, YearlyFee: 19200 },
  ];

  return (
    <Paper>
      {feeStructure.map((el, i) => {
        return (
          <Box key={i}>
            <SingleCard
              stdClass={el.class}
              monthlyFee={el.MonthlyFee}
              yearlyFee={el.YearlyFee}
            />
          </Box>
        );
      })}
    </Paper>
  );
};

export default FeeVoucher;
