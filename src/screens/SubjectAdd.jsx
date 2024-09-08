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

const SubjectAdd = () => {
  const [subject, setSubject] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [group, setGroup] = useState("");
  const [classGroup, setClassGroup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "subjects"), {
        subject,
        classGroup,
        stdClass,
        group,
      });
      console.log("Document written with ID: ", docRef.id);
      setSubject("");
      setStdClass("");
      setGroup("");
      setClassGroup("");
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
        Add Subject
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Subject Name</InputLabel>
          <TextField
            fullWidth
            required
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Box>

        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Class Group</InputLabel>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
            >
              <MenuItem value="I-VIII">I-VIII</MenuItem>
              <MenuItem value="IX-X">IX-X</MenuItem>
              <MenuItem value="XI-XII">XI-XII</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {classGroup === "I-VIII" ? (
          <Box mb="25px">
            <InputLabel sx={{ mb: "10px" }}>Class</InputLabel>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={stdClass}
                onChange={(e) => setStdClass(e.target.value)}
              >
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="II">II</MenuItem>
                <MenuItem value="III">III</MenuItem>
                <MenuItem value="IV">IV</MenuItem>
                <MenuItem value="V">V</MenuItem>
                <MenuItem value="VI">VI</MenuItem>
                <MenuItem value="VII">VII</MenuItem>
                <MenuItem value="VIII">VIII</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : classGroup === "IX-X" ? (
          <Box mb="25px">
            <InputLabel sx={{ mb: "10px" }}>Class</InputLabel>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={stdClass}
                onChange={(e) => setStdClass(e.target.value)}
              >
                <MenuItem value="IX">IX</MenuItem>
                <MenuItem value="X">X</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box mb="25px">
            <InputLabel sx={{ mb: "10px" }}>Class</InputLabel>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={stdClass}
                onChange={(e) => setStdClass(e.target.value)}
              >
                <MenuItem value="XI">XI</MenuItem>
                <MenuItem value="XII">XII</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        {classGroup === "IX-X" ? (
          <Box mb="25px">
            <InputLabel sx={{ mb: "10px" }}>Group</InputLabel>
            <RadioGroup
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <FormControlLabel
                value="Computer Science"
                control={<Radio />}
                label="Computer Science"
              />
              <FormControlLabel
                value="Biology"
                control={<Radio />}
                label="Biology"
              />
            </RadioGroup>
          </Box>
        ) : classGroup === "XI-XII" ? (
          <Box mb="25px">
            <InputLabel sx={{ mb: "10px" }}>Group</InputLabel>
            <RadioGroup
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <FormControlLabel
                value="General"
                control={<Radio />}
                label="General Science"
              />
              <FormControlLabel
                value="Pre Engineering"
                control={<Radio />}
                label="Pre Engineering"
              />
              <FormControlLabel
                value="Pre Medical"
                control={<Radio />}
                label="Pre Medical"
              />
              <FormControlLabel
                value="Commerce"
                control={<Radio />}
                label="Commerce"
              />
            </RadioGroup>
          </Box>
        ) : null}

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

export default SubjectAdd;
