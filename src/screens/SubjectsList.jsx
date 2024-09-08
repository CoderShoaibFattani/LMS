import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "subject", headerName: "Subject Name", width: 130 },
  { field: "classGroup", headerName: "Class Group", width: 130 },
  {
    field: "stdClass",
    headerName: "Class",
    type: "email",
    width: 70,
  },
  {
    field: "group",
    headerName: "Group",
    width: 150,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const snapshot = await getDocs(collection(db, "subjects"));
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

const SubjectsList = () => {
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
        Subjects List
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
          onClick={() => navigate("/dashboard/Subjects-Form")}
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

export default SubjectsList;
