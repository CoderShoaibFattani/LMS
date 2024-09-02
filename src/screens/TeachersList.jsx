import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 250,
  },
  {
    field: "education",
    headerName: "Education",
    width: 100,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const snapshot = await getDocs(collection(db, "teachers"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(data);
  };
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

const TeachersList = () => {
  const navigate = useNavigate();
  return (
    <Box margin="20px auto" sx={{ position: "relative" }}>
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
        Teachers List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "40px 60px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/dashboard/Teacher-Registration")}
        >
          Add
        </Button>
      </Box>

      <Box>
        <DataTable />
      </Box>
    </Box>
  );
};

export default TeachersList;
