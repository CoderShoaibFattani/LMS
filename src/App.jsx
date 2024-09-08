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
import TeacherRegistration from "./screens/TeacherRegistration";
import TeachersList from "./screens/TeachersList";
import HomeRoute from "./Routes/HomeRoute";
import User from "./Routes/User";
import SubjectAdd from "./screens/SubjectAdd";
import SubjectsList from "./screens/SubjectsList";
import ClassForm from "./screens/ClassForm";
import ClassList from "./screens/ClassList";
import FeeVoucher from "./screens/FeeVoucher";
import FeeSubmision from "./screens/FeeSubmision";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeRoute />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        <Route element={<User />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              path="Student-Registration"
              element={<StudentRegistration />}
            />
            <Route path="Students-List" element={<StudentList />} />
            <Route
              path="Teacher-Registration"
              element={<TeacherRegistration />}
            />
            <Route path="Teachers-List" element={<TeachersList />} />
            <Route path="Subjects-Form" element={<SubjectAdd />} />
            <Route path="Subjects-List" element={<SubjectsList />} />
            <Route path="Class-Form" element={<ClassForm />} />
            <Route path="Class-List" element={<ClassList />} />
            <Route path="Fee-Voucher" element={<FeeVoucher />} />
            <Route path="Fee-Submission" element={<FeeSubmision />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
