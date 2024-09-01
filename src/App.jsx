import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import Dashboard from "./screens/Dashboard";
import StudentRegistration from "./screens/StudentRegistration";
import StudentList from "./screens/StudentList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="Student-Registration"
            element={<StudentRegistration />}
          />
          <Route path="Students-List" element={<StudentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
