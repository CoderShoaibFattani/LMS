import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CardUI = () => {
  const [data, setData] = useState("");

  const dataFromLocalStorage = () => {
    const dataFromLS = localStorage.getItem("feeInfo");
    if (dataFromLS) {
      const parsedData = JSON.parse(dataFromLS);
      setData(parsedData);
      localStorage.removeItem("feeInfo");
      localStorage.removeItem("stdID");
    }
  };

  useEffect(() => {
    dataFromLocalStorage();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1">
          Fee Voucher
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Student Name</Typography>
          <Typography>{data.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Student Class</Typography>
          <Typography>{data.stdClass}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Monthly Fee</Typography>
          <Typography>{data.monthlyFee}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Yearly Fee</Typography>
          <Typography>{data.yearlyFee}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const FeeVoucher = () => {
  return (
    <Grid container spacing={3} mt="30px">
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          Student Copy
        </Typography>
        <CardUI />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          Bank Copy
        </Typography>
        <CardUI />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
          School Copy
        </Typography>
        <CardUI />
      </Grid>
    </Grid>
  );
};

export default FeeVoucher;
