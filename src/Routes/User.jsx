import { Navigate, Outlet } from "react-router-dom";

const User = () => {
  return localStorage.getItem("userId") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default User;
