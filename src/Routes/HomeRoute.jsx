import { Navigate, Outlet } from "react-router-dom";

const HomeRoute = () => {
  return !localStorage.getItem("userId") ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} />
  );
};

export default HomeRoute;
