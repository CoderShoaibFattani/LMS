import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const data = [
    { Students: ["Student Registration", "Students List"] },
    { Teachers: ["Teacher Registration", "Teachers List"] },
    { Subjects: ["Subjects Form", "Subjects List"] },
    { Syllabus: ["Syllabus Form", "Syllabus List"] },
    { School: ["Student Registration", "Teacher Registration"] },
    { Class: ["Class Form", "Class List"] },
    { Fees: ["Fee Structure", "Fee Voucher", "Fee Submission"] },
    { Admission: ["Admission Form"] },
    { Exam: ["Exam Schedule", "Exam result"] },
  ];

  const navigate = useNavigate();

  const handleNavigation = (item) => {
    const path = `/dashboard/${item.replace(/ /g, "-")}`;
    navigate(path);
  };

  return (
    <Box role="presentation" sx={{ overflow: "scroll" }}>
      {data.map((e, i) => {
        const category = Object.keys(e);
        const items = e[category];

        return (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}a-content`}
              id={`panel${i}a-header`}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <MailOutlineIcon />
                <Typography sx={{ fontSize: "1.3rem" }}>{category}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ margin: "0", padding: "0 0 0 45px" }}>
              <List sx={{ margin: "0", padding: "0" }}>
                {items.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    button
                    onClick={() => handleNavigation(subItem)}
                  >
                    <ListItemText primary={subItem} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default SideBar;
